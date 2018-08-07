# Stuckwithyou

Chat with random stranger, omegle/chatroullette style chat application, built with firebase and ionic framework.


I got this idea for a while. A chat app where you stuck with someone for 24 hours. An app where force you to actually talk. The problem with omegle and chatroulette is how easy for anybody to just leave and disconnect. You have less chance to get to know each other. 

So this is the attempt, proof of concept built with firebase and ionic framework. It is very simple and no care have been given to the ux. The 24 hour lock haven't been implemented (it is kinda controversial, many people hate the idea).

The way it woks internally is very simple, after you enter username, you will join to existing chatroom with only 1 person in it. If the room not exist, it will create a new one with you in it.

No need register, verification, just put your username. It is intended to be anonymous, so you can use any username you like.


## Installation

Ensure you have nodejs and ionic installed in your machine.
	

	git clone 
	
	npm install
	
	ionic serve