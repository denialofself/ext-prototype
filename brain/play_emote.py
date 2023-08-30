import json
import sys

if __name__ == "__main__":
    args = json.loads(sys.argv[1])
    print("Ran play_emote task with" + str(args))