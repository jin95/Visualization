FROM ubuntu:18.04
MAINTAINER Jiyeon Park <wldus8677@naver.com>
ARG MosquittoVersion
ENV MosquittoVersion 1.5.7
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y wget
RUN wget http://mosquitto.org/files/source/mosquitto-$MosquittoVersion.tar.gz
RUN tar xvf mosquitto-$MosquittoVersion.tar.gz
RUN apt-get install -y  mosquitto
EXPOSE 1883
CMD ["mosquitto"]
