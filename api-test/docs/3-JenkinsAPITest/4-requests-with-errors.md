---
sidebar_position: 4
---

# Sending Requests That Cause Errors

This last section takes all the previous knowledge seen in the previous pages and use it to:

* Cause a 403 error of duplicate data in the database

* Cause a 500 error of unavailable server on one route

**:warning:NOTE**: in one case we want to verify if one assertion is failing and to do that is used a code like `assert !(1==2)` because in the basic groovy package we use there is no way to use something like `assertionFailure(1==2)` to continue the code even if this assertion is not true. Some solutions, that are over the purpose of this documentation can be found, [here](https://www.jenkins.io/doc/developer/testing) or [here](https://github.com/jenkinsci/JenkinsPipelineUnit) but a deeper knowledge of Jenkins and Groovy is required.

## 403 Error

In this code we create a user with a POST request and then attempt to create the same user with another POST request. What we expect is that the statuses of the two requests are different and that the one of the second request is 403. Finally the user is deleted.

You can verify this passages by following the code below that does not present nothing new apart the line `assert !(status1 == status2)` to confirm that the two responses' statuses are different.

```groovy
def contentJson
def response1
def response2
def response3
def status1
def status2
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
        stage("Creating the same user and expecting a 403 error") {
            steps {
                script {
                    response2 = httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', quiet: true, requestBody: """
                                    {
                                        "firebaseId": "$firebaseId",
                                        "userName": "$userName",
                                        "email": "$email"
                                    }
                                    """, url: 'http://localhost:5000/api/users/add', customHeaders: [[name: 'foo', value: 'bar']],  validResponseCodes: '200:500'
                    status2 = response2.status
                    assert !(status1 == status2)
                    assert status2 as int == 403
                }
            }
        }
        stage("Deleting the user") {
            steps {
                script {
                    def content = response1.content
                    contentJson = readJSON text: content
                    response3 = httpRequest "http://localhost:5000/api/users/delete/${contentJson.user.id}"
                    assert response3.status as int == 200
                }
            }
        }
    }
}
```

## 500 Error

In this case we simply call a route of the API that responds with a code of 500 because we're trying to deleting everything on the database (this is just an example).

```groovy
pipeline {
    agent any
    stages {
        stage("Variable Print Through echo") {
            steps {
                script {
                    def response = httpRequest url: "http://localhost:5000/api/deleteAll", validResponseCodes: '200:500'
                    def status = response.status
                    def content = response.content
                    def contentJson = readJSON text: content
                    assert status as int == 500
                    println contentJson
                }
            }
        }
    }
}
```

## References

* [HTTP Request Plugin Parameters](https://www.jenkins.io/doc/pipeline/steps/http_request/)
* [HTTP Request Plugin Documentation](https://plugins.jenkins.io/http_request/)
* [readJSON Documentation](https://www.jenkins.io/doc/pipeline/steps/pipeline-utility-steps/#readjson-read-json-from-files-in-the-workspace)
* [HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
* [Jenkins Unit Testing](https://www.jenkins.io/doc/developer/testing/)
* [Jenkins Unit Testing GitHub Page](https://github.com/jenkinsci/JenkinsPipelineUnit)