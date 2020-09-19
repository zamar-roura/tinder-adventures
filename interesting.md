## Interesting stuff

## last_activity_date

```sh
$ jq '.last_activity_date' matches-server-response.json
```

Two possibilities that I can think of:
1. That's the last activity of your match => stalking ( **information disclosure** )
2. That's the last time you (the owner) checked your messages



## Decompilation
Found the following on decompilation. Breakpoint on debug would be interesting.

src/java/com/tinder/feed/domain/ActivityEventNewMatch.java
````java
@NotNull
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("ActivityEventNewMatch(userNumber=");
        stringBuilder.append(this.a);
        stringBuilder.append(", otherUserNumber=");
        stringBuilder.append(this.b);
        stringBuilder.append(", timestamp=");
        stringBuilder.append(this.getTimestamp());
        stringBuilder.append(")");
        return stringBuilder.toString();
    }
````
