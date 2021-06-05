#3折线图一个是随年份的revenue变化

from csv_operation import csv_reader



movies = csv_reader("tmdb_5000_movies.csv", "data")
print(movies[0], "#" * 10, movies[1], '@'*10)
print('len=', len(movies),
	movies[0]['release_date'], movies[0]['revenue'])