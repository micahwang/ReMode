from django.http import HttpResponse,Http404,FileResponse
from django.template import loader
from django.http import HttpResponseRedirect
import datetime
import random
from django import forms
from django.shortcuts import render
import json
from .models import relation_job
import os
from django.http import JsonResponse
import datetime,time,random
import rdkit
from rdkit import Chem
from rdkit.Chem import Descriptors
from random import randint
import pandas as pd
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.pyplot import MultipleLocator
from django.core.mail import send_mail 
from django.conf import settings

def index(request):
    return render(request, 'introduction.html')

def pki_doc(request):
    return render(request,'pki_doc.html')

def rhelp(request):
    return render(request,'pki_help.html')

def tid_maker():
    return '{0:%Y%m%d%H%M%S%f}'.format(datetime.datetime.now())+''.join([str(random.randint(1,10)) for i in range(5)])
   
def auth(request):
    if request.method == 'POST':
        request_data=request.body
        print(request_data)
        request_dict=json.loads(request_data.decode('utf-8'))
        tar = request_dict.get('target_name')
        num = int(request_dict.get('numbers'))
        jn = request_dict.get('job_name')
        smi = request_dict.get('smi')
        emi = request_dict.get('ema')
        mw_1 = float(request_dict.get('mw_1'))
        mw_2 = float(request_dict.get('mw_2'))
        logp_1 = float(request_dict.get('logp_1'))
        logp_2 = float(request_dict.get('logp_2'))
        opt = int(request_dict.get('optswitch'))
        method=''
        method= request_dict.get('optmethod')
        qed=int(request_dict.get('qed'))
        sa=int(request_dict.get('sa'))
        ID='{0:%Y}'.format(datetime.datetime.now())+''.join([str(random.randint(1,10)) for i in range(10)])
        
        if smi != '':
            mol = Chem.MolFromSmiles(smi)
            if mol is not None:
                mol_mw = Descriptors.MolWt(mol)
            else:
                mol_mw=0
        else:
            mol_mw=500
            mol=0
        if  mol_mw >= 700 or mol_mw <= 150 or mol is None:
            data = {'status': 'ER', 'response': ID}
            print(data)
            return JsonResponse(data)
        else:
            data = {'status': 'RI', 'response': ID}
            print(data)
            relation_job.objects.create(job_ID=ID,job_name=jn, target=tar, num_gen=num, email=emi, smi=smi, state='Queuing')
            #tar = 'mol_1'
            if smi == '':
                smi=0
            if method == None:
                method=0

            
            with open('./web/design_results/'+ID+'0.txt',"w") as f:
                f.write(str(smi))

            os.system('python ./model/REMODE/sample.py -t %s -j %s -n %s -m %s -m1 %s \
                -l %s -l1 %s -q %s -s %s -e %s -o %s -z %s &' % (ID, tar, \
            ID, num, mw_1, mw_2, logp_1, logp_2, qed, sa, emi, opt, method) )
            



            rel_job = relation_job.objects.get(job_ID=ID)

            rel_job.state='Queuing'
            rel_job.valid='-'
            rel_job.novel1='-'
            rel_job.novel2='nove_zinc'
            rel_job.unique='uni'
            rel_job.fcd='fcd'
            rel_job.fcd1='-'
            rel_job.save()

            return JsonResponse(data)
       
  



def check(request):
    if request.method == 'POST':
        uid = request.POST['mid']
        ID_info = relation_job.objects.filter(job_ID = request.POST['mid'])
        if ID_info.exists():
            dirName="./web/design_results"
            file_List = [x for x in os.listdir(dirName)]
            uid_1 = uid+'.csv'
            if uid_1 in file_List:
                status = "Your Job is complete"         
                return render(request, 'check.html', context={'ID':uid,'stat':status})
            else:                
                status = "Your Job is Queuing" 
                return render(request, 'check1.html', context={'ID':uid,'stat':status})
        else:
            status = "ID does not exist or is in the wrong format"
            return render(request, 'check1.html', context={'ID':uid,'stat':status})
    else:
        return render(request,'check0.html')

def result(request,uid):
    ID_info = relation_job.objects.filter(job_ID = uid)
    if ID_info.exists():
        print(uid)
        data = relation_job.objects.get(job_ID=uid)
        print(data)
        df=pd.read_csv('./web/design_results/usr_met.csv')
        df=df.loc[df["id"] == uid]

        a=round(list(df['vali'])[0],2)
        b=round(list(df['uni'])[0],2)
        c=round(list(df['nove_zinc'])[0],2)

        return render(request,'result.html', context={'ID':uid,'Job_name':data.job_name, 'Target':data.target, 'Email':data.email, 
        'Numbers':data.num_gen,'Vaildity' : a, 'Unique': b, 'NZ': c,'NT' : '1.0'})

    else:
        return render(request,'404.html')

def result_0(request):
    if request.method == 'POST':
        uid = request.POST['mid']
        ID_info = relation_job.objects.filter(job_ID = request.POST['mid'])
        if ID_info.exists():
            dirName="./web/design_results"
            file_List = [x for x in os.listdir(dirName)]
            data = relation_job.objects.get(job_ID=uid)
            uid_1 = uid+'.csv'
            if uid_1 in file_List:
                df=pd.read_csv('./web/design_results/usr_met.csv')
                df=df.loc[df["id"] == int(uid)]
                print(df)
                try:
                    a=round(list(df['vali'])[0],2)
                    b=round(list(df['uni'])[0],2)
                    c=round(list(df['nove_zinc'])[0],2)
                except:
                    a='error'
                    b='error'
                    c='error'
                return render(request,'result.html', context={'ID':uid,'Job_name':data.job_name, 'Target':data.target, 'Email':data.email, 
                'Numbers':data.num_gen,'Vaildity' : a, 'Unique': b, 'NZ': c,'NT' : '1.0'})
            else:                
                status = "Your Job is Queuing" 
                return render(request, 'result1.html', context={'ID':uid,'stat':status})
        else:
            status = "ID does not exist or is in the wrong format"
            return render(request, 'result1.html', context={'ID':uid,'stat':status})
    else:
        return render(request,'result0.html')





def download(request,uid):
    print(uid)
    file = open("./web/design_results/"+str(uid)+'.csv', 'rb')
    response = FileResponse(file)
    response['Content-Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename=gen_smi.csv'
    return response
    
    
def queue_stat(request):
    queue_list=[]   
    for data in relation_job.objects.all():
        dirName="./web/design_results"
        file_List = [x for x in os.listdir(dirName)]
        uid_1 = data.job_ID +'.csv'
        if uid_1 in file_List:
            queue_list.append({'name':data.job_name,'ID': data.job_ID,'State': "Completed"})
        else:
            queue_list.append({'name':data.job_name,'ID': data.job_ID,'State': "Queuing"})
    print(queue_list)
    return render(request, 'queue.html', {'queuers': queue_list})



def dl_files(request,tar):
    file = open('./web/mysite/design/static/dlfiles/'+str(tar)+'.zip', 'rb')
    response = FileResponse(file)
    response['Content-Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename="doc.zip"'
    return response










        

