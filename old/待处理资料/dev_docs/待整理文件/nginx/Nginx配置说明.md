Nginx 配置文件由三部分组成:  

全局块，主要设置一些影响 Nginx 服务器整体运行的配置指令。比如：worker_processes 1;worker_processes 值越大，可以支持的并发处理量就越多。  

Events 块，涉及的指令主要影响 Nginx 服务器与用户的网络连接。比如：worker_connections 1024;支持的最大连接数。  

HTTP 块，又包括 HTTP 全局块和 Server 块，是服务器配置中最频繁的部分，包括配置代理、缓存、日志定义等绝大多数功能。Server 块：配置虚拟主机的相关参数。Location 块：配置请求路由，以及各种页面的处理情况。  

### 配置文件  

    ########### 每个指令必须有分号结束。################# 
    #user administrator administrators;  #配置用户或者组，默认为nobody nobody。 
    #worker_processes 2;  #允许生成的进程数，默认为1 
    #pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址 
    error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg 
    events { 
        accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on 
        multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off 
        #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport 
        worker_connections  1024;    #最大连接数，默认为512 
    } 
    http { 
        include       mime.types;   #文件扩展名与文件类型映射表 
        default_type  application/octet-stream; #默认文件类型，默认为text/plain 
        #access_log off; #取消服务日志     
        log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式 
        access_log log/access.log myFormat;  #combined为日志格式的默认值 
        sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。 
        sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。 
        keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。 
    
        upstream mysvr {    
        server 127.0.0.1:7878; 
        server 192.168.10.121:3333 backup;  #热备 
        } 
        error_page 404 https://www.baidu.com; #错误页 
        server { 
            keepalive_requests 120; #单连接请求上限次数。 
            listen       4545;   #监听端口 
            server_name  127.0.0.1;   #监听地址        
            location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。 
            #root path;  #根目录 
            #index vv.txt;  #设置默认页 
            proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表 
            deny 127.0.0.1;  #拒绝的ip 
            allow 172.18.5.54; #允许的ip            
            }  
        } 
    }    


### 正向代理  

正向代理的代理对象是客户端。正向代理就是代理服务器替客户端去访问目标服务器。  

    server{ 
        resolver 8.8.8.8; 
        listen 80; 
    
        location / { 
            proxy_pass http://$http_host$request_uri; 
        } 
    } 

### 反向代理  

反向代理指代理后端服务器响应客户端请求的一个中介服务器，代理的对象是服务端。  

实现效果：在浏览器输入 www.abc.com , 从 Nginx 服务器跳转到 Linux 系统 Tomcat 主页面。  

    server { 
        listen       80;    
        server_name  192.168.4.32;   #监听地址 
    
        location  / {        
            root html;  #/html目录 
            proxy_pass http://127.0.0.1:8080;  #请求转向 
            index  index.html index.htm;      #设置默认页        
        }  
    }  

实现效果：根据在浏览器输入的路径不同，跳转到不同端口的服务中。  

    server { 
        listen       9000;    
        server_name  192.168.4.32;   #监听地址        
    
        location  ~ /example1/ {   
        proxy_pass http://127.0.0.1:5000;          
        }  
    
        location  ~ /example2/ {   
        proxy_pass http://127.0.0.1:8080;          
        }  
    }   

### 负载均衡  

实现效果：在浏览器地址栏输入 http://192.168.4.32/example/a.html ，平均到 5000 和 8080 端口中，实现负载均衡效果。  

    upstream myserver {    
    server 192.167.4.32:5000; 
    server 192.168.4.32:8080; 
    } 
    
    
    server { 
        listen       80;   #监听端口 
        server_name  192.168.4.32;   #监听地址 
    
        location  / {        
        root html;  #html目录 
        index index.html index.htm;  #设置默认页 
        proxy_pass  http://myserver;  #请求转向 myserver 定义的服务器列表       
        }  
    }   

### Nginx 分配服务器策略  

轮询(默认)：按请求的时间顺序依次逐一分配，如果服务器 down 掉，能自动剔除。

权重：weight 越高，被分配的客户端越多，默认为 1。  

    upstream myserver {    
    server 192.167.4.32:5000 weight=10; 
    server 192.168.4.32:8080 weight=5; 
    } 

IP：按请求 IP 的 Hash 值分配，每个访客固定访问一个后端服务器。  

    upstream myserver {  
    ip_hash;   
    server 192.167.4.32:5000; 
    server 192.168.4.32:8080; 
    } 

Fair：按后端服务器的响应时间来分配，响应时间短的优先分配到请求。  

    upstream myserver {  
    fair;   
    server 192.168.4.32:5000; 
    server 192.168.4.32:8080; 
    }   

### Nginx 缓存  

实现效果：在 3 天内，通过浏览器地址栏访问 http://192.168.4.32/a.jpg，不会从服务器抓取资源，3 天后(过期)则从服务器重新下载。  

# http 区域下添加缓存区配置 
proxy_cache_path /tmp/nginx_proxy_cache levels=1 keys_zone=cache_one:512m inactive=60s max_size=1000m; 
 
# server 区域下添加缓存配置 

    location ~ \.(gif|jpg|png|htm|html|css|js)(.*) { 
        proxy_pass http://192.168.4.32:5000；#如果没有缓存则转向请求 
        proxy_redirect off; 
        proxy_cache cache_one; 
        proxy_cache_valid 200 1h;            #对不同的 HTTP 状态码设置不同的缓存时间 
        proxy_cache_valid 500 1d; 
        proxy_cache_valid any 1m; 
        expires 3d; 
    }   

### 动静分离  

实现效果：通过浏览器地址栏访问 www.abc.com/a.html ，访问静态资源服务器的静态资源内容。  
通过浏览器地址栏访问 www.abc.com/a.jsp ，访问动态资源服务器的动态资源内容。  

    upstream static {    
        server 192.167.4.31:80; 
    } 
    
    upstream dynamic {    
        server 192.167.4.32:8080; 
    } 
    
    server { 
        listen       80;   #监听端口 
        server_name  www.abc.com; 监听地址 
    
        # 拦截动态资源 
        location ~ .*\.(php|jsp)$ { 
        proxy_pass http://dynamic; 
        } 
    
        # 拦截静态资源 
        location ~ .*\.(jpg|png|htm|html|css|js)$ {        
        root /data/;  #html目录 
        proxy_pass http://static; 
        autoindex on;;  #自动打开文件列表 
        }   
    }   

### 高可用  

一般情况下，通过 Nginx 主服务器访问后台目标服务集群，当主服务器挂掉后，自动切换至备份服务器，此时由备份服务器充当主服务器的角色，访问后端目标服务器。 

实现效果：准备两台 Nginx 服务器，通过浏览器地址栏访问虚拟 IP 地址，把主服务器的 Nginx 停止，再次访问虚拟 IP 地址仍旧有效。  

    # 安装 keepalived 
    yum install keepalived -y 
    
    # 检查版本 
    rpm -q -a keepalived 
    keepalived-1.3.5-16.el7.x86_64   

1.在两台 Nginx 服务器上安 Keepalived：Keepalived 相当于一个路由，它通过一个脚本来检测当前服务器是否还活着，如果还活着则继续访问，否则就切换到另一台备份服务器。  

2.修改主备服务器/etc/keepalived/keepalivec.conf 配置文件(可直接替换)，完成高可用主从配置。  

Keepalived 将 Nginx 服务器绑定到一个虚拟 IP，Nginx 高可用集群对外统一暴露这个虚拟 IP，客户端都是通过访问这个虚拟 IP 来访问 Nginx 服务器 。  

    global_defs { 
        notification_email { 
            acassen@firewall.loc 
            failover@firewall.loc 
            sysadmin@firewall.loc 
        } 
        notification_email_from_Alexandre.Cassen@firewall.loc 
        smtp_server 192.168.4.32 
        smtp_connect_timeout 30 
        router_id LVS_DEVEL  # 在 /etc/hosts 文件中配置，通过它能访问到我们的主机 
    } 
    
    vrrp_script_chk_http_port {    
        script "/usr/local/src/nginx_check.sh" 
    
        interval 2      # 检测脚本执行的时间间隔 
    
        weight 2        # 权重每次加2 
    } 
    
    vrrp_instance VI_1 { 
        interface ens7f0 # 网卡，需根据情况修改 
        state MASTER    # 备份服务器上将 MASTER 改为 BACKUP 
        virtual_router_id 51 # 主备机的 virtual_router_id 必须相同 
        priority 100   # 主备机取不同的优先级，主机值较大，备份机值较小 
        advert_int 1  # 每隔多长时间（默认1s）发送一次心跳，检测服务器是否还活着 
        authentication { 
        auth_type PASS 
        auth_pass 1111 
        } 
        virtual_ipaddress { 
            192.168.1.100 # VRRP H 虚拟地址，可以绑定多个 
        } 
    }   

字段说明如下：  

router_id：在 /etc/hosts 文件中配置，通过它能访问到我们的主机。  

    127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4 
    ::1         localhost localhost.localdomain localhost6 localhost6.localdomain6 
    127.0.0.1   LVS_DEVEL    

interval：设置脚本执行的间隔时间。  

weight：当脚本执行失败即 Keepalived 或 Nginx 挂掉时，权重增加的值(可为负数)。  

interface：输入 ifconfig 命令查看当前的网卡名是什么。    

3.在 /usr/local/src 目录下添加检测脚本 nginx_check.sh：  

    #!/bin/bash 
    A=`ps -C nginx -no-header |wc -l` 
    if [ $A -eq 0 ];then 
        /usr/local/nginx/sbin/nginx 
        sleep 2 
        if [ ps -C nginx -no-header |wc -l` -eq 0 ];then 
            killall keepalived 
        fi 
    fi 

4.启动两台服务器的 Nginx 和 Keepalived：  

    # 启动 nginx 
    ./nginx 
    
    # 启动 keepalived 
    systemctl start keepalived.service   

5.查看虚拟 IP 地址 IP a。把主服务器 192.168.4.32 Nginx 和 Keepalived 停止，再访问虚拟 IP 查看高可用效果。
