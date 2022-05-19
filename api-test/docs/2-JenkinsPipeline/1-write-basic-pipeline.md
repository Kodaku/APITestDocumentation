---
sidebar_position: 1
---

# Write a Basic Pipeline In Jenkins

In this chapter we will see how to write a very basic pipeline in Jenkins with the assumption that you're able to create a Pipeline project and you know how to run it.

## Pipeline Code

For the sake of simplicity and clarity we will write nothing special but a simple print.

```groovy
pipeline {
    agent any
    stages {
        stage("A basic print") {
            steps {
                script {
                    println "Hello"
                }
            }
        }
    }
}
```

## Code Explanation

* The *pipeline*  statement we're just initializing the Jenkins pipeline.
* The *agent* statement is inizializing a Jenkins agent to execute the pipeline
* The *stages* statement is used to tell Jenkins that all of the code that will be in the curly brackets will have to be executed under different stages (at least one)
* The *stage* statement declares a stage and in it we have its steps
* The *steps* statement is used to instruct Jenkins on what to do in this stage
* The *script* statement is used to tell Jenkins that there will be Groovy code to be executed

An important aspect of the Jenkins pipeline is that it executes all the stages sequentially and if a stage fails then all the others will fail because the pipeline will interrupt at the first stage that fails.

## References
* [Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
* [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
* [Jenkins Agent](https://www.jenkins.io/doc/book/using/using-agents/)
