
### win10 https:/go.microsoft.com/ fwlink/?LinkID=135170禁止运行脚本
```
通过PowerShell路径打开

第一步：在win10系统中进去PowerShell的路径，依次点击“C:\WINDOWS\System32\WindowsPowerShell”

第二步：继续点击V1.0文件夹，找到powershell.exe，双击进去 

第三步：以管理员身份打开PowerShell

解决：

第一步：set-executionpolicy remotesigned

第二步：选择A

```


### Visual Studio Code运行flask环境配置
- 更新PIP（PIP是最新版此步跳过）

```
python -m pip install --upgrade pip
```

- 安装虚拟插件（由于不同项目需要用到不同环境，所以安装虚拟环境非常有必要）virtualenv：

```
pip install virtualenv
```

- 新建项目文件夹（如我在D盘建立mypython文件夹）

- 在mypython文件夹下打开CMD，建立虚拟环境，输入：

```
virtualenv -p python3 venv
```

- 进入.venv\Scripts文件夹激活虚拟环境

```
venv\Scripts\activate
```

- 虚拟环境安装flask:

```
pip install Flask
```

- 添加vscode扩展插件

python
code runner

- 配置launch.json文件。点击运行，添加配置, 选择flask

把app.py改成run.py,回车

完成后会在.vscode里自动添加launch.json文件。

```python title=run.py
from flask import Flask
app = Flask(__name__)
@app.route("/")
def test():
    return "hello"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

- 测试 

打开run.py文件，并按一下键盘上的F5运行

### requirements
```
Flask
Flask-Migrate
Flask-Script
Flask-SQLAlchemy
Pillow
PyMySQL
python-dateutil
xlrd
xlwt
```