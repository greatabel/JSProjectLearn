import os
import pickle
import pprint
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import csv
import codecs

def csv_reader(filename, directory="./"):
	p = os.path.join(directory, filename)
	# with open(os.path.join(directory, filename), "rb") as csvfile:
	# 	reader = csv.reader(csvfile, delimiter="\n", quotechar="|")
	# 	mylist = []
	# 	for row in reader:
	# 		if row[0] != '"':
	# 			mylist.append(row[0].split(","))
	# 	return mylist
	mylist = []
	with codecs.open(p, 'r') as csv_file:
		log_reader = csv.DictReader((l.replace('\0', '') for l in csv_file))
		for line in log_reader:
			# print(line['release_date'])
			mylist.append(line)
	        # if line['Addition Information'] == str 
           # do something
	return mylist