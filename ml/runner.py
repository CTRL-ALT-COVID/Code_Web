import os
import sys
from datetime import datetime
sys.path.insert(1, './deployable-model')
import predict
import argparse

def download_files_url(url, username):
    import requests
    path_inp="./audio_storage/downloaded"
    if not os.path.exists(path_inp+"/"+username):
        os.mkdir("{}/{}".format(path_inp, username))
    if(username=='debug1'):
        url = 'https://firebasestorage.googleapis.com/v0/b/crack-covid.appspot.com/o/songs%2F538.1442960969454%2Fsong?alt=media&token=06a57936-93e6-43d4-80d3-96d10c2649e0'
    r = requests.get(url, allow_redirects=True)
    date=str(datetime.now()).replace(" ", "--")
    print(date)
    open('{}/{}/{}.webm'.format(path_inp, username, str(username+"--"+date)), 'wb').write(r.content)
    print(path_inp+"/"+username)
    return path_inp
    ''' ./audio_storage/downloaded/debug '''

def transfer_files(pathin, i, storage, name_file, username):
    storage=storage+"/"+username;
    print(storage)
    if not os.path.exists(storage):
        os.mkdir(storage)
    os.rename(pathin+"/"+i, storage+"/"+name_file)
    print(i,"tranfered successfully")

def convert_from_stereo_to_mono(username, pathin, pathout, storage):
    from pydub import AudioSegment
    file= os.listdir(pathin)
    print(file)
    count=0
    pathout=pathout+"/"+username
    print("------------------------------------------", pathout)
    if not os.path.exists(pathout):
        os.mkdir(pathout)
    # print("in: ", pathin)
    # print("out: ", pathout)
    for i in file:
        count+=1
        print("in: ", "{}/{}".format(pathin, i))
        sound = AudioSegment.from_wav("{}/{}".format(pathin, i))
        sound = sound.set_channels(1)
        time= str(datetime.now())
        name_file=str(username+"__"+str(count)+"---"+i+"---"+"-"+time+".wav")
        sound.export("{}/{}".format(pathout,name_file), format="wav")
        print("converted successfully")
        transfer_files(pathin, i, storage, name_file, username)
    return True

def convert_to_wav(pathin, pathout):## TODO: there is a more elegant way to do both convert_from_stereo_to_mono and convert_to_wav.
    import subprocess
    files= os.listdir(pathin+"/")
    print(files[0])
    if not os.path.exists(pathout):
        os.makedirs(pathout)

    # print("inp path: {}/{}".format(pathin, files[0]))
    # print("out path: {}/{}".format(pathout, files[0][:files[0].index('.')]))
    command = "ffmpeg -i {}/{} -ab 160k -ac 2 -ar 44100 -vn {}/{}.wav".format(pathin, files[0], pathout, files[0][:files[0].index('.')])
    subprocess.call(command, shell=True)
    command1= 'rm {}'.format(pathin+"/"+files[0])
    print("converted successfully", pathin+"/"+files[0])
    # TODO: Move the file out
    try:
        subprocess.call(command1, shell=True)
        print("file deleted successfully")
    except:
        print("error in deleting")
    return pathout


def load_test_data(username, url, args):
    storage= args.str_path
    download_path=download_files_url(url, username)
    test_out=args.test_out
    print(storage," is the storage")
    print(download_path," is the download_path")

    if(username=="debug"):
        path=download_path # TODO: change this!!
    else:
        path=download_path
    # print("path: ", path)
    # print("pathout: ", test_out)
    path = convert_to_wav(download_path+"/"+username, args.test_path+"/"+username)
    if(convert_from_stereo_to_mono(username, path, test_out, storage)):
        print("uo")
        return test_out
    else:
        load_test_data(username)



def run(username, url):
    print("----------------------------------------------------------------")
    parser= argparse.ArgumentParser(description ="where to store the rec after conversion")
    parser.add_argument("--str_path", type=str, default="./audio_storage/collection", help="where would we store the good stuff?")
    parser.add_argument("--test_path", type=str, default='./audio_storage/test', help="path to test folder")
    parser.add_argument("--test_out", type=str, default='./audio_storage/testout', help="path to test folder")
    args, _ = parser.parse_known_args()
    path_out=load_test_data(username, url, args)
    print(path_out+"/"+username)
    try:
        ans = predict.run(path_out+"/"+username)
    except:
        print("error in pred")
    print(ans)
    return ans['2'],username
# if __name__=='__main__':
#     run("debug1")
