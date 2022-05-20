---
sidebar_position: 3
---

# POST Request And Header Manipulation

This type of request introduces a more advance usage of the plugin _httpRequest_ including:

-   request header manipulation

-   request body manipulation

-   response valid response codes manipulation

-   using one response to perform another request that depends on the previous response

## POST Request Code

As we've done with the GET example let's first see the code and then explain it.

```groovy
def contentJson
def response1
def response2
def status1
def userName = "Francone11"
def email = "francone11@franco.com"
def firebaseId = "Francone11Firebase"
pipeline {
    agent any
    stages {
        stage("Creating A User In The Database") {
            steps {
                script {
                    response1 = httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', quiet: true, requestBody: """
                                    {
                                        "firebaseId": "$firebaseId",
                                        "userName": "$userName",
                                        "email": "$email"
                                    }
                                    """, url: 'http://localhost:5000/api/users/add', customHeaders: [[name: 'foo', value: 'bar']], validResponseCodes: '200:500'
                    status1 = response1.status
                    assert status1 as int == 201
                }
            }
        }
        stage("Deleting the created user") {
            steps {
                script {
                    def content = response1.content
                    contentJson = readJSON text: content

                    println contentJson

                    response2 = httpRequest "http://localhost:5000/api/users/delete/${contentJson.user.id}"
                    assert response2.status as int == 200
                }
            }
        }
    }
}
```

Since this is a bit long let's review it stage by stage

### Variable Declarations

```groovy
def contentJson
def response1
def response2
def status1
def userName = "Francone11"
def email = "francone11@franco.com"
def firebaseId = "Francone11Firebase"
```

In this first part we're simply declaring global variables and their usage will be:

-   contentJson: used to store the response content in JSON format

-   response1: the first response derived from the POST

-   response2: the second response derived from the GET request to delete the test data inserted

-   status1: the status of the response1 used to verify that is 201

-   userName, email, firebaseId: data used to create the POST request body

### Creating a User

This is the first stage

```groovy
stage("Creating A User In The Database") {
    steps {
        script {
            response1 = httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', quiet: true, requestBody: """
                            {
                                "firebaseId": "$firebaseId",
                                "userName": "$userName",
                                "email": "$email"
                            }
                            """, url: 'http://localhost:5000/api/users/add', customHeaders: [[name: 'foo', value: 'bar']], validResponseCodes: '200:500'
            status1 = response1.status
            assert status1 as int == 201
        }
    }
}
```

The main focus will be posed on the usage of the httpRequest:

-   **acceptType**: this parameter is the HTTP content type to accept

-   **contentType**: this parameter is the HTTP content type the request is using

-   **httpMode**: the type of the request (GET or POST for example)

-   **quiet**: turn off all logging output

-   **requestBody**: the body of the request, notice the string interpolation of variables we've seen in the chapter about [variables](../JenkinsPipeline/using-variables-in-pipeline)

*   **customHeaders**: to manipulate the request header. Here the _name_ parameter is the name of the field of the header, while _value_ is the value of this field. If we print out the header on the server side we will see `foo: bar` together with the other attributes of the header.

*   **validResponseCodes**: the range of the HTTP status we accept. By default this plugin only accepts statuses from 200 to 399 and therefore we have to change it with `200:500` to accept statuses from 200 to 500. If you want another range then just manipulate this parameter.

### Deleting the Created User
```groovy
stage("Deleting the created user") {
    steps {
        script {
            def content = response1.content
            contentJson = readJSON text: content

            println contentJson

            response2 = httpRequest "http://localhost:5000/api/users/delete/${contentJson.user.id}"
            assert response2.status as int == 200
        }
    }
}
```

Here we don't see nothing new apart from the usage of the variable *contentJson* accessing its attribute *user* and the user's attribute *id*.

## Code Execution Note

If you execute this pipeline and an error is encountered in one stage then the others won't be executed, they'll automatically fail. If the execution is successfull then it means that all the assertions and requests where correct.

## References

* [HTTP Request Plugin Parameters](https://www.jenkins.io/doc/pipeline/steps/http_request/)
* [HTTP Request Plugin Documentation](https://plugins.jenkins.io/http_request/)
* [readJSON Documentation](https://www.jenkins.io/doc/pipeline/steps/pipeline-utility-steps/#readjson-read-json-from-files-in-the-workspace)