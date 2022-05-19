---
sidebar_position: 2
---

# Simple GET Request

The first type of request we will see is the simplest: GET. Here we will also see some fundamentals concepts like:

-   httpRequest plugin basic usage

-   API response's attributes

-   pipeline-utility-steps function readJSON

## GET Request Code

```groovy
pipeline {
    agent any
    stages {
        stage("Variable Print Through echo") {
            steps {
                script {
                    def response = httpRequest "http://localhost:5000/api/questions/1"
                    def status = response.status
                    def content = response.content
                    def contentJson = readJSON text: content
                    assert status as int == 200
                    println contentJson
                }
            }
        }
    }
}
```

## Code Explanation

Apart from the already explained _pipeline_, _stages_, _stage_, _steps_, _def_ and _script_ we will focus on the particular syntax in the script statement.

-   **httpRequest**: this is the call to a function and then, without using parentheses, we put the url we want to send the request to. Another way we can write a valid call to this function is by using `httpRequest url: "http://localhost:5000/api/questions/1"` that is by specifying the parameter _url_.

-   **status**: this an attribute of the response object returned by the call to the API and contains, as the name suggests, the HTTP status of the request

-   **content**: this is the content of the response and we have to convert it JSON in order to access its attributes. This task is performed using the function _readJSON_ and passing the variable _content_ as the parameter _text_.

-   **assert**: this is used to test if the status of the response is 200 (OK). If it is true then the test will be passed.

-   At the end we print the content of the response in JSON format just to verify that the API has sent back something meaningful.

## References

* [HTTP Request Parameters](https://www.jenkins.io/doc/pipeline/steps/http_request/)
* [HTTP Request Documentation](https://plugins.jenkins.io/http_request/)
* [readJSON Documentation](https://www.jenkins.io/doc/pipeline/steps/pipeline-utility-steps/#readjson-read-json-from-files-in-the-workspace)