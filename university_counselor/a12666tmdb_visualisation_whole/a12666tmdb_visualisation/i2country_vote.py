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
	tlist = json.loads(movie['production_countries'])
	for t in tlist:
		name = t['name']
		if movie['vote_count'] is not None:
			vote_count = float(movie['vote_count'])
		else:
			vote_count = 0
		# print(year, revenue)
		item = [name, vote_count]
		year_revenue.append(item)

print(year_revenue)

print('----#--------#--------#----')
mylist = []
mylist.append(["Country", "Value"])
for i, g in groupby(sorted(year_revenue), key=lambda x: x[0]):
	count_v = sum(v[1] for v in g)
	if count_v > 30:
		mylist.append([i, count_v])





print(mylist[0:10])
print('----#--------#--------#----')


csv_write(mylist, 'i2country_vote.csv')
