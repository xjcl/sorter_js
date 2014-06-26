# convert list into js 'hard code' (see aa.js)
# not needed to run the program, just a reference (xjcl)

cases = \
"""Phoenix Wright
    -The First Turnabout
    -Turnabout Sisters
    -Turnabout Samurai
    -Turnabout Goodbyes
    -Rise from the Ashes
Justice for All
    -The Lost Turnabout
    -Reunion, and Turnabout
    -Turnabout Big Top
    -Farewell, My Turnabout
Trials and Tribulations
    -Turnabout Memories
    -The Stolen Turnabout
    -Recipe for Turnabout
    -Turnabout Beginnings
    -Bridge to the Turnabout
Apollo Justice
    -Turnabout Trump
    -Turnabout Corner
    -Turnabout Serenade
    -Turnabout Succession
Ace Attorney Investigations
    -Turnabout Visitor
    -Turnabout Airlines
    -The Kidnapped Turnabout
    -Turnabout Reminiscence
    -Turnabout Ablaze
Ace Attorney Investigations 2
    -Turnabout Target
    -The Imprisoned Turnabout
    -The Inherited Turnabout
    -The Forgotten Turnabout
    -The Grand Turnabout
Dual Destinies
    -Turnabout Countdown
    -The Monstrous Turnabout
    -Turnabout Reclaimed
    -Turnabout Academy
    -The Cosmic Turnabout
    -Turnabout for Tomorrow
Professor Layton vs. Ace Attorney
    -The English Court
    -The Fire Witch
    -The Golden Court
    -The Final Witch Trial"""

cases = cases.split("\n")
output = ""

i = -1
for c in cases:
    if c.startswith('    '):
        output += '[1, '
        output += '"' + c[5:] + '", '
        a = [0,0,0,0,0,0,0,0]
        a[i] = 1
        output += str(a) + "],\n"
    else:
        i += 1

print(output) # use with pipes! "python cases_convert.py > results"



