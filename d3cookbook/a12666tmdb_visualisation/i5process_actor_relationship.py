#找出电影演员和票房总收入的关联

from csv_operation import csv_reader, csv_write
from itertools import groupby
import json
import itertools


movies = csv_reader("tmdb_5000_credits.csv", "data")
print('1sample', movies[0], "#" * 10)
print('len=', len(movies))
t = json.loads(movies[0]['cast'])
print(len(t), t[0], t[1])

year_revenue = []
for movie in movies:
	tlist = json.loads(movie['cast'])
	for t in tlist:
		name = t['name']

		# print(year, revenue)
		item = [name, 1]
		year_revenue.append(item)

print(year_revenue)

print('----#--------#--------#----')
names = []
for i, g in groupby(sorted(year_revenue), key=lambda x: x[0]):
	count_v = sum(v[1] for v in g)
	if count_v > 30:
		names.append(i)

print(names, len(names))
print('----#--------#--------#----')
pairs = list(itertools.combinations(names, 2))
print(pairs)
pairs_count = {}
for movie in movies:
	tlist = json.loads(movie['cast'])
	tnames = []
	for t in tlist:
		name = t['name']
		tnames.append(name)
	for pair in pairs:
		if pair[0] in tnames and pair[1] in tnames:
			if pair not in pairs_count:
				pairs_count[pair] = 1
			else:
				pairs_count[pair] += 1
print(pairs_count)
print('----#--------#--------#----')
mylist = []
for key, value in pairs_count.items():
	if value > 3:
		item = {"word1": key[0], "word2": key[1],  "freq": str(value)}
		mylist.append(item)

for item in mylist:
	print(item)
# [		
#     {"word1": "ILM", "word2": "RDU",  "freq":"8.04"},
#     {"word1": "RDU", "word2": "IAD",  "freq":"7.44"},
# ]