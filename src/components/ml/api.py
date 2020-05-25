from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
import sys
import  os

sys.path.insert(1, "../")
# sys.path.insert(1, './deployable-model')

# import runner

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
    return jsonify({"username": "username", "status": 50})

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


@app.route("/getResult", methods=["GET","POST"])
def get_details():
    if(request.method == "POST"):

        # global username
        # print("--------------username: ", username)
        # username="abc"
        # print("--------------username: ", username)
        name_from_post= request.json
        username= name_from_post['username']
        print("-----------===============-------", username)
        res=read_result(username)

        return jsonify({"username": username, "status": res['result']['status']})


def get_ans(username, url):
    status,username=runner.run(username, url) #how to put user name?
    # username="abc"
    # status="safe"
    # a=dict()
    # a['name']= username
    # a['status']=status
    # ans=[]
    # for x,y in a.items():
    #     ans.append(a)
    print(status)
    return status

def read_result(username):
    import json
    res=""
    with open("./result/{}.json".format(username)) as f:
        s=f.read()
        res=json.loads(s)
    print("res:", res)
    return res
if __name__ == '__main__':
    # a=runner.run()

    # ans=a.get("abc")
    app.run(debug=True)
