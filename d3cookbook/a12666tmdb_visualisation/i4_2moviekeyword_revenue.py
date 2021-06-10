#找出电影演员和票房总收入的关联

from csv_operation import csv_reader, csv_write
from itertools import groupby
import json


movies = csv_reader("tmdb_5000_movies.csv", "data")
print('1sample', movies[0], "#" * 10)
print('len=', len(movies))
t = json.loads(movies[0]['keywords'])
print(len(t), t[0], t[1])

year_revenue = []
for movie in movies:
	revenue = int(movie['revenue'])
	tlist = json.loads(movie['keywords'])
	for t in tlist:
		name = t['name']

		# print(year, revenue)
		item = [name, revenue]
		year_revenue.append(item)

print(year_revenue)

print('----#--------#--------#----')
my_list2 = []
keyword_revenue = []
keyword_revenue.append(['keyword','revenue'])
justwords  = []
for i, g in groupby(sorted(year_revenue), key=lambda x: x[0]):
	count_v = sum(v[1] for v in g)
	if count_v > 5893668099:
		my_list2.append({'word': i, 'size': int(count_v/500000000)})
		keyword_revenue.append([i, count_v])
		justwords.append(i)
print(my_list2)
print(" ".join(justwords))
csv_write(keyword_revenue, 'i4keyword_revenue.csv')
'''
[{'word': '3d', 'size': 77}, {'word': 'aftercreditsstinger', 'size': 72}, {'word': 'airplane', 'size': 14}, {'word': 'alien', 'size': 29}, {'word': 'animation', 'size': 19}, {'word': 'based on comic book', 'size': 42}, {'word': 'based on novel', 'size': 55}, {'word': 'based on young adult novel', 'size': 17}, {'word': 'battle', 'size': 17}, {'word': 'best friend', 'size': 12}, {'word': 'biography', 'size': 12}, {'word': 'cia', 'size': 13}, {'word': 'conspiracy', 'size': 13}, {'word': 'daughter', 'size': 15}, {'word': 'dc comics', 'size': 14}, {'word': 'dinosaur', 'size': 13}, {'word': 'duringcreditsstinger', 'size': 113}, {'word': 'dying and death', 'size': 18}, {'word': 'dystopia', 'size': 42}, {'word': 'elves', 'size': 13}, {'word': 'escape', 'size': 15}, {'word': 'explosion', 'size': 15}, {'word': 'family', 'size': 12}, {'word': 'father son relationship', 'size': 14}, {'word': 'friendship', 'size': 22}, {'word': 'future', 'size': 17}, {'word': 'hero', 'size': 13}, {'word': 'imax', 'size': 27}, {'word': 'island', 'size': 13}, {'word': 'london england', 'size': 13}, {'word': 'los angeles', 'size': 13}, {'word': 'love', 'size': 16}, {'word': "love of one's life", 'size': 11}, {'word': 'magic', 'size': 29}, {'word': 'martial arts', 'size': 13}, {'word': 'marvel cinematic universe', 'size': 20}, {'word': 'marvel comic', 'size': 38}, {'word': 'mission', 'size': 16}, {'word': 'monster', 'size': 12}, {'word': 'murder', 'size': 17}, {'word': 'musical', 'size': 16}, {'word': 'new york', 'size': 13}, {'word': 'orcs', 'size': 12}, {'word': 'rescue', 'size': 13}, {'word': 'revenge', 'size': 24}, {'word': 'robot', 'size': 11}, {'word': 'saving the world', 'size': 23}, {'word': 'scientist', 'size': 12}, {'word': 'secret agent', 'size': 13}, {'word': 'secret identity', 'size': 18}, {'word': 'sequel', 'size': 51}, {'word': 'ship', 'size': 16}, {'word': 'soldier', 'size': 12}, {'word': 'space', 'size': 16}, {'word': 'space opera', 'size': 13}, {'word': 'spy', 'size': 15}, {'word': 'super powers', 'size': 15}, {'word': 'superhero', 'size': 52}, {'word': 'suspense', 'size': 15}, {'word': 'terrorist', 'size': 14}, {'word': 'time travel', 'size': 13}, {'word': 'undercover', 'size': 14}, {'word': 'violence', 'size': 29}, {'word': 'war', 'size': 13}, {'word': 'witch', 'size': 18}, {'word': 'woman director', 'size': 30}]

'''

