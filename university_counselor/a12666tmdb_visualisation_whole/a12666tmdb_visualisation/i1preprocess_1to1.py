from csv_operation import csv_reader, csv_write
from itertools import groupby


movies = csv_reader("tmdb_5000_movies.csv", "data")
print('1sample', movies[0], "#" * 10)
print('len=', len(movies),
	movies[0]['release_date'], movies[0]['revenue'])

mylist = []
mylist.append(["budget", "revenue", "popularity", "runtime", "vote_average", "vote_count"])
for movie in movies:

	budget =  float(movie['budget'])/1000000
	revenue =  float(movie['revenue'])/1000000
	popularity = float(movie['popularity'])
	if movie['runtime']!= '':
		runtime = float(movie['runtime'])
	else:
		runtime = 0
	if movie['vote_average'] is not None:
		vote_average = float(movie['vote_average'])
	else:
		vote_average = 0
	if movie['vote_count'] is not None:
		vote_count = float(movie['vote_count'])
	else:
		vote_count = 0
	item = [budget, revenue, popularity, runtime, vote_average, vote_count]
	mylist.append(item)





print(mylist[0:10])
print('----#--------#--------#----')


csv_write(mylist, 'i1one_to_one.csv')
