from csv_operation import csv_reader, csv_write
from itertools import groupby


from csv_operation import csv_reader, csv_write
from itertools import groupby
import json

movies = csv_reader("tmdb_5000_movies.csv", "data")
print('1sample', movies[0], "#" * 10)
print('len=', len(movies),
	movies[0]['release_date'], movies[0]['revenue'])

i0_2 = 0
i2_4 = 0
i4_6 = 0
i6_7 = 0
i7_8 = 0
year_revenue = []
for movie in movies:
	tlist = json.loads(movie['genres'])
	for t in tlist:
		name = t['name']
		if movie['vote_average'] is not None:
			vote_count = float(movie['vote_average'])
			if vote_count < 2:
				i0_2 += 1
			if vote_count >= 2 and vote_count < 4:
				i2_4 += 1
			if vote_count >= 4 and vote_count < 6:
				i4_6 += 1
			if vote_count >= 6 and vote_count < 7:
				i6_7 += 1
			if vote_count >= 7 and vote_count < 8:
				i7_8 += 1
		else:
			vote_count = 0
		# print(year, revenue)
		item = [name, vote_count]
		year_revenue.append(item)

print(year_revenue)
print('i0_2=', i0_2)
print('i2_4=', i2_4)
print('i4_6=', i4_6)
print('i6_7=', i6_7)
print('i7_8=', i7_8)


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

# x = [randint(0, 90) for p in range(0, len(genres))]
# print(x)

# x = [randint(0, 1961) for p in range(0, len(genres))]
# print(x)

# x = [randint(0, 2492) for p in range(0, len(genres))]
# print(x)

# x = [randint(0, 1202) for p in range(0, len(genres))]
# print(x)

print(mylist[0:10])
print('----#--------#--------#----')


csv_write(mylist, 'i2genres_vote.csv')
