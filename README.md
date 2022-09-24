# ReMODE: Receptor-based MOlecular DEsign
# A deep learning-based web server for target-specific drug design


## Overview
This repository contains the main Django files and RELATION model of front end and back end of our server(http://cadd.zju.edu.cn/relation/remode/).  


## Requirements
- Python == 3.7
- Django >= 3.0
- pytorch >= 1.1.0
- openbabel == 2.4.1
- RDKit == 2020.09.5
- theano == 1.0.5
- pyscreener [README](https://github.com/coleygroup/pyscreener)

if utilizing GPU accelerated model training 
- CUDA==10.2 & cudnn==7.5 

### Creat a new environment in conda 

 `conda env create -f env.yml `



## Build Remode apps in your Django web

Add the design/ folder in your Django development directory, with the MVT framework configured (https://docs.djangoproject.com/en/3.1/):

                           
 `python3 manage.py runserver 0.0.0.0:8000`
