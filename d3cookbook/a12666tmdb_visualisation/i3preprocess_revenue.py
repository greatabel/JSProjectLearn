#3折线图一个是随年份的revenue变化

from csv_operation import csv_reader, csv_write
from itertools import groupby


movies = csv_reader("tmdb_5000_movies.csv", "data")
print('1sample', movies[0], "#" * 10)
print('len=', len(movies),
	movies[0]['release_date'], movies[0]['revenue'])

year_revenue = []
for movie in movies:
	year = movie['release_date'][:4]
	revenue =  float(movie['revenue'])
	# print(year, revenue)
	item = [year, revenue]
	year_revenue.append(item)

print(year_revenue)

print('----#--------#--------#----')
my_list2 = []
for i, g in groupby(sorted(year_revenue), key=lambda x: x[0]):
    my_list2.append([i, sum(v[1] for v in g)])

print(my_list2)
csv_write(my_list2, 'year_revenue_sum.csv')


def my_mean(values):
    n = 0
    Sum = 0.0
    for v in values:
        Sum += v
        n += 1
    return Sum / n

print('----#--------#--------#----')
my_list3 = []
for i, g in groupby(sorted(year_revenue), key=lambda x: x[0]):
    my_list3.append([i, my_mean(v[1] for v in g)])

print(my_list3)
csv_write(my_list3, 'year_revenue_mean.csv')