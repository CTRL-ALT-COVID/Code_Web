from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
import sys
import  os

sys.path.insert(1, "../")
# sys.path.insert(1, './deployable-model')

import runner

app= Flask(__name__)
CORS(app)

ans=None
url=""
username=""
# @app.route("/")
@app.route("/process")
def hello():
    import json
    print("username: ", username)
    print("url", url)
    ans=get_ans(username, url)
    print("ooooooooooooooooooooooooooooooooooooooooooooo", ans)
    result=ans
    if not os.path.exists("./result"):
        os.mkdir("./result")
    with open("./result/{}.json".format(username), 'w') as f:
        f.write(json.dumps({"username": username, "result": result}))
    return jsonify({"username": username, "result": result})

def getResult(username, url):
    ans=get_ans(username, url)
    print("ooooooooooooooooooooooooooooooooooooooooooooo", ans)
    result=ans
    print("check")
    if not os.path.exists("./result"):
        os.mkdir("./result")
    # with open("./result/{}.json".format(username), 'w') as f:
    #     f.write(json.dumps({"username": username, "result": result}))
    print("check")
    return jsonify({"username": username, "status": result})

@app.route('/submit', methods=["GET", "POST"])
def submit():
    global username
    global url
    import json
    print("----")
    try:
        print("inside submit")
        if request.method == "POST":
            output_from_react= request.json
            print("username: ", username)
            print("url: ", url)
            username=output_from_react['name']
            url=output_from_react['url']
            print("username: ", username)
            print("url", url)
            res=getResult(username, url)
            print("(((((((((())))))))))",res)
            return res
    except:
        print("error")


# @app.route("/getResult", methods=["GET","POST"])
# def get_details():
#     if(request.method == "POST"):
#
#         # global username
#         # print("--------------username: ", username)
#         # username="abc"
#         # print("--------------username: ", username)
#         name_from_post= request.json
#         username= name_from_post['username']
#         print("-----------===============-------", username)
#         res=read_result(username)
#
#         return jsonify({"username": username, "status": res['result']['status']})


def get_ans(username, url):
    status,username=runner.run(username, url) #how to put user name?
    print(status)
    return status

# @app.route('/getZone/',methods=['POST'])
# def getZone():
#     output=0
#     print("--------------------------------------------abc")
#     try:
#         print("abc")
#         if request.method=="POST":
#             print("abc")
#             result_zone= request.json
#             var1=float(result_zone['var1'])
#             print("abc", var1)
#             var2=float(result_zone['var2'])
#             print("abc", var2)
#             output=float(var1)+float(var2)
#             print("abc")
#             print(getZone.execute(23.32, 23.32))
#             print("var1:{}, var2:{}".format(var1, var2))
#
#             output1=getZone.execute(var1, var2)
#             print("abc ", output1)
#             return jsonify({"zone": output1})
#     except:
#         print("error")
# def read_result(username):
#     import json
#     res=""
#     with open("./result/{}.json".format(username)) as f:
#         s=f.read()
#         res=json.loads(s)
#     print("res:", res)
#     return res
if __name__ == '__main__':
    # a=runner.run()

    # ans=a.get("abc")
    app.run(debug=False)
