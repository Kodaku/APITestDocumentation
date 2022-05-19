---
sidebar_position: 2
---

# Variables In Jenkis Pipeline

In this chapter we will see how to declare and use variable interpolation in a Jenkins pipeline since the goal of this documentation will be to interpolate variables in the API call url.

## Declare and Use A Variable In A Stage

To declare and use a variable we can use the folloing pipeline script as a reference.
**Note**: This script uses global variables, but you can declare local variables within the _script_ statement but be aware that their scope will be just that statement.

```groovy
def salut = "Hello"
pipeline {
    agent any
    stages {
        stage("Use the variable in string interpolation") {
            steps {
                script {
                    println "$salut"
                }
            }
        }
    }
}
```

In this case the variable _salut_ is used in two quotes string but we can use it also in a triple quote string using this syntax.

```groovy
def salut = "Hello"
pipeline {
    agent any
    stages {
        stage("Use the variable in string interpolation") {
            steps {
                script {
                    println """
                    $salut
                    """
                }
            }
        }
    }
}
```

The result will be the same as before with the exception that with triple quotes we can write multi line strings.

## Using Variables In More Stages

Now we can use global variables across multiple stages using this reference.

A variable is declared using the keyword *def*.

```groovy
def salut = "Hello"
pipeline {
    agent any
    stages {
        stage("Use the variable in string interpolation") {
            steps {
                script {
                    println """
                    $salut
                    """
                }
            }
        }
        stage("Chaging the variable's value") {
            steps {
                script {
                    salut = "Changing"
                }
            }
        }
        stage("Printing the new variable's value") {
            steps {
                script {
                    println """
                    $salut
                    """
                }
            }
        }
    }
}
```

If you run this code with Jenkins you will see a "Hello" printed first and then "Changing" as the last print that is the new value of the variable *salut* assigned in the second stage.

## References
* [Variables and Scripts](https://www.jenkins.io/doc/book/pipeline/syntax/#script)
