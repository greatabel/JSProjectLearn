from csv_operation import csv_reader, csv_write
from itertools import groupby


from csv_operation import csv_reader, csv_write
from itertools import groupby
import json

movies = csv_reader("tmdb_5000_movies.csv", "data")
print('1sample', movies[0], "#" * 10)
print('len=', len(movies),
	movies[0]['release_date'], movies[0]['revenue'])

year_revenue = []
for movie in movies:
	tlist = json.loads(movie['genres'])
	for t in tlist:
		name = t['name']
		if movie['vote_average'] is not None:
			vote_count = float(movie['vote_average'])
		else:
			vote_count = 0
		# print(year, revenue)
		item = [name, vote_count]
		year_revenue.append(item)

print(year_revenue)

print('----#--------#--------#----')
mylist = []
genres = []

mylist.append(["genres", "vote_average"])
for i, g in groupby(sorted(year_revenue), key=lambda x: x[0]):
	count_v = sum(v[1] for v in g)
	if count_v > 30:
		mylist.append([i, count_v])
		genres.append(i)

from random import randint

x = [randint(0, 1000) for p in range(0, len(genres))]
print(x)


print(mylist[0:10])
print('----#--------#--------#----')


csv_write(mylist, 'i2genres_vote.csv')
