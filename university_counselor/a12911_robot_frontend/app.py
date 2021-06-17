from flask import Flask, url_for, render_template, request, redirect, session,jsonify
from flask_sqlalchemy import SQLAlchemy


import io
import random
from flask import Response



app = Flask(__name__)
app.debug = True


@app.route("/simulate_test", methods=["GET", "POST"])
def simulate_test0():
    print('in simulate_test0')
    flag = request.form.get("flag")
    text = request.form.get("text")
    print('flag=',flag,'text=', text)
    if flag == '藏品编号' and text == '兵马俑':
        return {"status": "sucess", "content": "展品content\n 展品content2\n3"}, 200
    return {"status": "failed", "content": "没有找到该展品"}, 200


@app.route("/", methods=["GET", "POST"])
def home():
    return render_template("index.html")





if __name__ == "__main__":
    app.run(host='localhost', port=8000, threaded=False)
