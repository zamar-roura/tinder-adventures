## Interesting stuff

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