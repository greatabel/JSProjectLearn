#找出电影演员和票房总收入的关联

from csv_operation import csv_reader, csv_write
from itertools import groupby
import json


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
my_list2 = []
for i, g in groupby(sorted(year_revenue), key=lambda x: x[0]):
	count_v = sum(v[1] for v in g)
	if count_v > 30:
		my_list2.append({'word': i, 'size': count_v})

print(my_list2)
# csv_write(my_list2, 'actor_frequence.csv')

