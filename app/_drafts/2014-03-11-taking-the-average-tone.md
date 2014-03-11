---
layout: post
tags:
- audio
- python
- lisp
- math
tldr: Beautiful songs create ugly sounds when you take their mean fundamental frequency, and that's really obvious.
---

Today I wanted to see what the average frequency of a song would sound like with no spectrum analysis or separation. I had a hunch that it would end up sounding like garbage, and I was totally right.

If you took the average color of a beautiful painting, it would likely turn out poo brown. Today, I created the audio equivalent.

[Blazo's Misty Sapphire](http://youtu.be/rlyYQlPrdac):

<iframe width="100%" height="124" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/138919830&amp;color=ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_artwork=false"></iframe>

[Steve Reich's Music for 18 Musicians](http://youtu.be/E_jwv2QMtAo):

<iframe width="100%" height="124" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/138919828&amp;color=ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_artwork=false"></iframe>

[Kill the Noise remix of KOAN Sound's Talk Box](http://youtu.be/f-6H8NsfPNQ):

<iframe width="100%" height="124" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/138920067&amp;color=ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_artwork=false"></iframe>

These first tones were generated using the powerful, free, cross-platform audio software [Audacity](http://audacity.sourceforge.net/) and a cool lisp-y language called Nyquist.

> Nyquist is a programming language for sound synthesis and analysis based on the Lisp programming language.
> -- <cite>[Wikipedia](http://en.wikipedia.org/wiki/Nyquist_(programming_language))</cite>

Audacity lets you run Nyquist on audio selections. My process was:

1. Drag the desired audio file into [Audacity](http://audacity.sourceforge.net/)
2. On the left side of the window, click the arrow beside the track's name
3. Select "Split Stereo to Mono" from the resulting dropdown
4. Double-click the top track to select it
5. In the menu bar, click Effect > Nyquest Prompt...
6. Enter the following into the prompt:
    <pre><code class='language-lisp'>
      (setf f0 (aref (yin s 33 93 4400) 0))
      (setf fl (truncate (snd-length f0 ny:all)))
      (setf mean-f0 (snd-fetch (snd-avg f0 fl fl op-average)))
      (format nil "Mean Fundamental Frequency:~%~a ~~~a"
              (step-to-hz mean-f0)
              (nth (round mean-f0) nyq:pitch-names))
    </code></pre>
7. Let it run and __remember the output frequency__
8. Keeping the track selected, click Generate > Tone... in the top menu
9. Input the frequency that was generated in step 7
10. Repeat 4 - 9 on the bottom track
11. Click the arrow again and select "Make Stereo Track"

It's hack-y and too manual, but it was enough to show me that I definitely didn't want to keep going down this path. From a spectrum this wide, across such a long duration, the tones I was getting had little to do with the original song. At best, I'd found a roundabout way to generate spooky alien noises.

## Measures of central tendency

Let's review the concepts of _mean_, _median_, and _mode_.

 - __Mean__, often called _average_, is the sum of all values in a set divided by the number of values in the set
 - __Median__ is the middle-point in a set ordered by magnitude
 - __Mode__, the ugly cousin of median, is the most commonly occuring value in a set

Given the following set of numbers: { __8, 4, 6, 6 ,8, 4, 8__ },

and rearranging them in order: { __4, 4, 6, 6, 8, 8, 8__ },

we observe a _median_ of 7, a _mode_ of 8, and a _mean_ of... 6.29?

## Why mean sometimes sucks

Though I can't think of a time outside of class where I've needed to find an exact median, I couldn't last a day without calculating a mean. Because of this I can confidently say that mean is the _best_!

Except for sometimes.

Our results above demonstrate what I'm talking about: just as 6.29 isn't part of the set { __8, 4, 6, 6 ,8, 4, 8__ }, each tone that I generated wasn't _really_ part of its song. In the process of finding the "average" tone, we lost touch with the most important part of the song; its individual notes.

## O'er to SciPy we go
