from flask import Flask, jsonify, request
from http import HTTPStatus

app = Flask(__name__)

in_theaters_movies = {
"count": 20,
"start": 0,
"total": 38,
"subjects": [{'id': 1325007, 'title': '蓝色星球 The Blue Planet', 'rating':  {'average':40}, 
'images': {'large': 'https://img3.doubanio.com/view/photo/l/public/p2574122772.webp'}, 
'summary': '蓝色星球」是历年来首套全面探索海洋世界的自然历史专辑'}, 
            {'id': 3041294, 'title': '生化危机4：战神再生', 'rating': {'average':45}, 
'images': {'large': 'https://img9.doubanio.com/view/photo/l/public/p564897015.webp'}, 
'summary': '爱丽丝（米拉·乔沃维奇 Milla Jovovich 饰）重回在东京，向安布雷拉公司复仇'}],
"title": "正在上映的电影-深圳"
}

movies = {}

@app.route("/v2/movie/in_theaters", methods=['GET'])
def in_theaters():
    return jsonify({'data': in_theaters_movies})

@app.route("/v2/movie/coming_soon", methods=['GET'])
def comming_soon():
    return jsonify({'data': movies})

@app.route("/v2/movie/top250", methods=['GET'])
def top250():
    return jsonify({'data': movies})



if __name__ == "__main__":
    app.run()