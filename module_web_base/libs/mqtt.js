import mqtt from "mqtt";

/**
 * MQTTClient类 - 封装MQTT.js功能
 * 提供连接管理、消息发布/订阅、断线重连等功能
 */
export class MQTTClient {
  /**
   * 构造函数
   * @param {Object} options 配置选项
   * @param {string} options.brokerUrl MQTT代理地址
   * @param {string} options.clientId 客户端ID
   * @param {string} options.username 用户名
   * @param {string} options.password 密码
   * @param {number} options.reconnectPeriod 重连间隔(毫秒)
   * @param {number} options.connectTimeout 连接超时时间(毫秒)
   * @param {number} options.maxReconnectAttempts 最大重连尝试次数
   */
  constructor(options = {}) {
    // 默认配置
    this.defaultOptions = {
      brokerUrl: "wss://test.mosquitto.org:8081/mqtt",
      clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
      username: "",
      password: "",
      reconnectPeriod: 5000,
      connectTimeout: 4000,
      maxReconnectAttempts: 10,
    };

    // 合并配置
    this.options = { ...this.defaultOptions, ...options };

    // MQTT客户端实例
    this.client = null;

    // 状态变量
    this.isConnected = false;
    this.reconnectCount = 0;
    this.reconnectAttempts = 0;
    this.reconnectTimer = null;
    this.connectionStartTime = 0;
    this.messagesReceived = 0;
    this.messagesSent = 0;
    this.subscribedTopics = new Set();

    // 回调函数
    this.onConnectCallback = null;
    this.onMessageCallback = null;
    this.onErrorCallback = null;
    this.onReconnectCallback = null;

    // 检查是否已加载MQTT.js
    if (typeof mqtt === "undefined") {
      throw new Error(
        "MQTT.js is not loaded. Please include it before using MQTTClient."
      );
    }
  }

  /**
   * 连接到MQTT代理
   * @returns {Promise} 连接Promise
   */
  connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
        return;
      }

      const options = {
        clientId: this.options.clientId,
        clean: true,
        reconnectPeriod: 0, // 禁用自动重连，我们自己实现
        connectTimeout: this.options.connectTimeout,
        username: this.options.username || undefined,
        password: this.options.password || undefined,
      };

      try {
        this.client = mqtt.connect(this.options.brokerUrl, options);

        // 设置事件处理器
        this.client.on("connect", () => {
          this.handleConnect();
          resolve();
        });

        this.client.on("message", (topic, message) => {
          this.handleMessage(topic, message);
        });

        this.client.on("error", (error) => {
          this.handleError(error);
          reject(error);
        });

        this.client.on("close", () => {
          this.handleClose();
        });

        this.client.on("offline", () => {
          this.handleOffline();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 处理连接成功事件
   */
  handleConnect() {
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.connectionStartTime = Date.now();

    // 执行连接回调
    if (this.onConnectCallback) {
      this.onConnectCallback();
    }
  }

  /**
   * 处理收到消息事件
   * @param {string} topic 主题
   * @param {Buffer} message 消息内容
   */
  handleMessage(topic, message) {
    this.messagesReceived++;

    const messageText = message.toString();

    try {
      let parsedMessage = messageText;
      try {
        parsedMessage = JSON.parse(messageText);
      } catch (e) {
        // 如果不是JSON，保持原样
      }
      // 执行消息回调
      if (this.onMessageCallback) {
        this.onMessageCallback(topic, parsedMessage);
      }
    } catch (error) {
      console.error("消息处理错误:", error);
    }
  }

  /**
   * 处理错误事件
   * @param {Error} error 错误对象
   */
  handleError(error) {
    // 执行错误回调
    if (this.onErrorCallback) {
      this.onErrorCallback(error);
    }

    this.scheduleReconnect();
  }

  /**
   * 处理连接关闭事件
   */
  handleClose() {
    this.handleDisconnection();
  }

  /**
   * 处理离线事件
   */
  handleOffline() {
    this.handleDisconnection();
  }

  /**
   * 处理断开连接
   */
  handleDisconnection() {
    this.isConnected = false;
    this.scheduleReconnect();
  }

  /**
   * 安排重连
   */
  scheduleReconnect() {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      return;
    }

    this.reconnectAttempts++;
    this.reconnectCount++;

    // 执行重连回调
    if (this.onReconnectCallback) {
      this.onReconnectCallback(
        this.reconnectAttempts,
        this.options.reconnectPeriod
      );
    }

    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect().catch((error) => {
        // 连接失败，继续重连
        this.scheduleReconnect();
      });
    }, this.options.reconnectPeriod);
  }

  /**
   * 断开连接
   */
  disconnect() {
    if (this.client) {
      this.client.end();
      this.client = null;
    }

    this.isConnected = false;
    clearTimeout(this.reconnectTimer);
  }

  /**
   * 订阅主题
   * @param {string} topic 主题名称
   * @param {Object} options 订阅选项
   * @returns {Promise} 订阅Promise
   */
  subscribe(topic, options = { qos: 0 }) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected || !this.client) {
        reject(new Error("Not connected to MQTT broker"));
        return;
      }

      this.client.subscribe(topic, options, (err) => {
        if (err) {
          reject(err);
        } else {
          this.subscribedTopics.add(topic);
          resolve();
        }
      });
    });
  }

  /**
   * 取消订阅
   * @param {string} topic 主题名称
   * @returns {Promise} 取消订阅Promise
   */
  unsubscribe(topic) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected || !this.client) {
        reject(new Error("Not connected to MQTT broker"));
        return;
      }

      this.client.unsubscribe(topic, (err) => {
        if (err) {
          reject(err);
        } else {
          this.subscribedTopics.delete(topic);
          resolve();
        }
      });
    });
  }

  /**
   * 发布消息
   * @param {string} topic 主题名称
   * @param {string} message 消息内容
   * @param {Object} options 发布选项
   * @returns {Promise} 发布Promise
   */
  publish(topic, message, options = { qos: 0, retain: false }) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected || !this.client) {
        reject(new Error("Not connected to MQTT broker"));
        return;
      }

      // 如果消息是对象，转换为JSON字符串
      let payload = message;
      if (typeof message === "object" && message !== null) {
        try {
          payload = JSON.stringify(message);
        } catch (error) {
          reject(new Error("Failed to stringify JSON message"));
          return;
        }
      }

      this.client.publish(topic, payload, options, (err) => {
        if (err) {
          reject(err);
        } else {
          this.messagesSent++;
          resolve();
        }
      });
    });
  }

  /**
   * 发布JSON数据（专用方法）
   * @param {string} topic 主题名称
   * @param {Object} data JSON数据对象
   * @param {Object} options 发布选项
   * @returns {Promise} 发布Promise
   */
  publishJson(topic, data, options = { qos: 1, retain: false }) {
    return this.publish(topic, data, options);
  }

  /**
   * 设置连接回调
   * @param {Function} callback 回调函数
   */
  onConnect(callback) {
    this.onConnectCallback = callback;
  }

  /**
   * 设置消息回调
   * @param {Function} callback 回调函数
   */
  onMessage(callback) {
    this.onMessageCallback = callback;
  }

  /**
   * 设置错误回调
   * @param {Function} callback 回调函数
   */
  onError(callback) {
    this.onErrorCallback = callback;
  }

  /**
   * 设置重连回调
   * @param {Function} callback 回调函数
   */
  onReconnect(callback) {
    this.onReconnectCallback = callback;
  }

  /**
   * 获取连接状态
   * @returns {boolean} 连接状态
   */
  getIsConnected() {
    return this.isConnected;
  }

  /**
   * 获取已订阅的主题列表
   * @returns {Array} 主题列表
   */
  getSubscribedTopics() {
    return Array.from(this.subscribedTopics);
  }

  /**
   * 获取消息统计
   * @returns {Object} 消息统计对象
   */
  getMessageStats() {
    return {
      received: this.messagesReceived,
      sent: this.messagesSent,
    };
  }

  /**
   * 获取连接时长（秒）
   * @returns {number} 连接时长
   */
  getConnectionTime() {
    if (!this.isConnected || this.connectionStartTime === 0) {
      return 0;
    }
    return Math.floor((Date.now() - this.connectionStartTime) / 1000);
  }

  /**
   * 获取重连统计
   * @returns {Object} 重连统计对象
   */
  getReconnectStats() {
    return {
      count: this.reconnectCount,
      attempts: this.reconnectAttempts,
      maxAttempts: this.options.maxReconnectAttempts,
    };
  }
}

/*

// 使用示例
// 注意：使用前需要先加载MQTT.js库

// 创建MQTT客户端实例
const mqttClient = new MQTTClient({
    brokerUrl: 'wss://test.mosquitto.org:8081/mqtt',
    clientId: 'my-client-id',
    reconnectPeriod: 5000,
    maxReconnectAttempts: 10
});

// 设置回调函数
mqttClient.onConnect(() => {
    console.log('Connected to MQTT broker');
    
    // 订阅主题
    mqttClient.subscribe('test/topic')
        .then(() => console.log('Subscribed to test/topic'))
        .catch(err => console.error('Subscription error:', err));
});

mqttClient.onMessage((topic, message) => {
    console.log(`Received message on ${topic}: ${message}`);
});

mqttClient.onError((error) => {
    console.error('MQTT error:', error);
});

mqttClient.onReconnect((attempt, delay) => {
    console.log(`Reconnect attempt ${attempt} in ${delay}ms`);
});

// 连接到MQTT代理
mqttClient.connect()
    .then(() => console.log('Connection established'))
    .catch(err => console.error('Connection failed:', err));

// 发布消息示例
// mqttClient.publish('test/topic', 'Hello MQTT')
//     .then(() => console.log('Message published'))
//     .catch(err => console.error('Publish error:', err));

// 断开连接示例
// mqttClient.disconnect();




// 使用示例：发送JSON数据到EMQX
const mqttClient = new MQTTClient({
    brokerUrl: 'ws://localhost:8083/mqtt',
    clientId: 'json-client-' + Math.random().toString(16).substr(2, 8),
    username: 'admin',
    password: 'public'
});

// 设置消息回调（自动解析JSON）
mqttClient.onMessage((topic, message) => {
    console.log(`收到消息 [${topic}]:`, message);
    
    // 如果是JSON对象，可以直接访问属性
    if (typeof message === 'object' && message !== null) {
        console.log('JSON数据解析成功:', message);
        if (message.sensorType && message.value) {
            console.log(`传感器 ${message.sensorType}: ${message.value}`);
        }
    }
});

// 连接到EMQX
mqttClient.connect().then(() => {
    console.log('连接到EMQX成功');
    
    // 订阅主题
    mqttClient.subscribe('sensors/#');
    
    // 示例1：发送简单的JSON对象
    const sensorData = {
        sensorType: 'temperature',
        value: 25.6,
        unit: '°C',
        timestamp: new Date().toISOString(),
        location: 'room-101',
        battery: 85
    };
    
    mqttClient.publishJson('sensors/temperature', sensorData)
        .then(() => console.log('温度数据发送成功'))
        .catch(err => console.error('发送失败:', err));
    
    // 示例2：发送设备状态信息
    const deviceStatus = {
        deviceId: 'device-001',
        status: 'online',
        firmware: 'v1.2.3',
        ip: '192.168.1.100',
        lastSeen: new Date().toISOString()
    };
    
    mqttClient.publishJson('devices/status', deviceStatus, { qos: 1, retain: true })
        .then(() => console.log('设备状态发送成功'))
        .catch(err => console.error('发送失败:', err));
    
    // 示例3：发送命令数据
    const command = {
        type: 'set_temperature',
        target: 22.5,
        mode: 'cooling',
        duration: 3600
    };
    
    mqttClient.publishJson('commands/ac-control', command, { qos: 2 })
        .then(() => console.log('命令发送成功'))
        .catch(err => console.error('发送失败:', err));
    
    // 示例4：发送数组数据
    const sensorReadings = [
        { timestamp: new Date().toISOString(), value: 24.5 },
        { timestamp: new Date(Date.now() - 60000).toISOString(), value: 24.3 },
        { timestamp: new Date(Date.now() - 120000).toISOString(), value: 24.7 }
    ];
    
    mqttClient.publishJson('sensors/history', sensorReadings)
        .then(() => console.log('历史数据发送成功'))
        .catch(err => console.error('发送失败:', err));
    
    // 示例5：发送带错误处理的数据
    const complexData = {
        metadata: {
            version: '1.0',
            source: 'web-client',
            format: 'json'
        },
        readings: {
            temperature: 25.6,
            humidity: 45.2,
            pressure: 1013.2
        },
        status: {
            healthy: true,
            errors: [],
            warnings: ['battery_low']
        }
    };
    
    mqttClient.publishJson('system/metrics', complexData, { qos: 1 })
        .then(() => console.log('系统指标发送成功'))
        .catch(err => console.error('发送失败:', err));

}).catch(err => {
    console.error('连接失败:', err);
});

// 定时发送传感器数据示例
setInterval(() => {
    if (mqttClient.getIsConnected()) {
        const tempData = {
            sensorId: 'temp-sensor-01',
            value: (20 + Math.random() * 10).toFixed(1),
            unit: '°C',
            timestamp: new Date().toISOString(),
            battery: Math.floor(70 + Math.random() * 30)
        };
        
        mqttClient.publishJson('sensors/temperature/room1', tempData)
            .then(() => console.log('定时温度数据发送成功'))
            .catch(err => console.error('发送失败:', err));
    }
}, 10000);

// 处理不同类型的JSON数据
function handleDifferentJsonTypes() {
    // 1. 配置数据
    const config = {
        device: {
            name: "Living Room Thermostat",
            type: "temperature",
            min: 16,
            max: 30,
            hysteresis: 0.5
        },
        schedule: [
            { time: "08:00", temp: 22 },
            { time: "18:00", temp: 20 },
            { time: "22:00", temp: 18 }
        ],
        advanced: {
            autoAdjust: true,
            ecoMode: false,
            notifications: true
        }
    };
    
    // 2. 事件数据
    const event = {
        type: "temperature_alert",
        severity: "warning",
        message: "Temperature above threshold",
        data: {
            current: 29.8,
            threshold: 28.0,
            duration: 300
        },
        timestamp: new Date().toISOString()
    };
    
    // 3. 批量数据
    const batchData = {
        batchId: "batch-" + Date.now(),
        records: [
            { id: 1, value: 24.5, ts: new Date().toISOString() },
            { id: 2, value: 24.3, ts: new Date(Date.now() - 1000).toISOString() },
            { id: 3, value: 24.7, ts: new Date(Date.now() - 2000).toISOString() }
        ],
        summary: {
            avg: 24.5,
            min: 24.3,
            max: 24.7,
            count: 3
        }
    };
    
    // 发布这些数据
    mqttClient.publishJson('config/thermostat', config, { retain: true });
    mqttClient.publishJson('events/temperature', event);
    mqttClient.publishJson('data/batch', batchData);
}

// JSON数据验证函数（可选）
function validateJsonData(data, schema) {
    // 简单的验证示例
    const requiredFields = schema.required || [];
    for (const field of requiredFields) {
        if (data[field] === undefined) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    return true;
}

// 使用验证的发布函数
function publishValidatedJson(topic, data, schema, options = {}) {
    try {
        validateJsonData(data, schema);
        return mqttClient.publishJson(topic, data, options);
    } catch (error) {
        console.error('数据验证失败:', error.message);
        return Promise.reject(error);
    }
}

// 定义数据模式
const temperatureSchema = {
    required: ['value', 'timestamp', 'sensorId']
};

// 使用验证发布
const validData = {
    sensorId: 'sensor-001',
    value: 25.6,
    timestamp: new Date().toISOString(),
    unit: '°C'
};

publishValidatedJson('sensors/validated', validData, temperatureSchema)
    .then(() => console.log('验证数据发送成功'))
    .catch(err => console.error('验证数据发送失败:', err));
*/
