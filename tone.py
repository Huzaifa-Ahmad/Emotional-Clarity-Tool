import nsbe
from flask import Flask

app = Flask(__name__)

from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import json

version = '2020-02-08'
apikey = 'JTW6G37b7CMlvTx7uJZT2iXfu9YnBczqBkQ_f4qzYFzC'
url = 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/4d324bd9-d788-4fa6-9feb-e992e903102e'



authenticator = IAMAuthenticator(apikey)
tone_analyzer = ToneAnalyzerV3(
    version= version,
    authenticator=authenticator
)

@app.route("/test2")
def test2():
    tone_analyzer.set_service_url(url)
    text = nsbe.speech()
    tone_analysis = tone_analyzer.tone(
        {'text': text},
        content_type='application/json'
    ).get_result()

    speechData = dict()
    speechData["text"] = text
    speechData["response"] = tone_analysis

    return json.dumps(speechData)


if __name__ == '__main__':
    app.run()

