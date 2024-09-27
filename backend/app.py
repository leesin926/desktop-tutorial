from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import bcrypt

app = Flask(__name__, static_folder='../frontend/dist', template_folder='../frontend/dist')

CORS(app)  # 允许跨域请求

# 模拟数据库（您可以用实际的数据库替换它）
users_db = {
    "user1": bcrypt.hashpw(b"password123", bcrypt.gensalt())
}


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # 验证用户
    if username in users_db and bcrypt.checkpw(password.encode('utf-8'), users_db[username]):
        return jsonify({"message": "Login successful", "status": "success"}), 200
    return jsonify({"message": "Invalid username or password", "status": "fail"}), 401


@app.route('/')
def index():
    """
    渲染主页模板。

    这个函数负责处理对网站根路径的GET请求。当用户访问网站的根URL时，它将返回主页的HTML内容。

    Returns:
        str: 主页的HTML内容。
    """
    return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True)
