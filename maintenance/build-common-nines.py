#!/usr/bin/env python3
# Writes common-nines.txt: the nine-letter words from brit-a-z.txt that are
# common enough to be used as conundrums, excluding plurals and present tense
# verbs (e.g. "elephants", "dominates").
#
# Requires wordfreq (`pip install wordfreq`). The output is committed, so this
# only needs re-running if the word list or threshold changes.

import os

from wordfreq import zipf_frequency

# Zipf scale: 3 is roughly once per million words, 2.5 is about a third of that
MIN_ZIPF = 2.5

here = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(here, 'brit-a-z.txt'), encoding='latin-1') as f:
	dictionary = {line.strip() for line in f}

words = sorted(
	w for w in dictionary
	if len(w) == 9 and w.isalpha() and w.islower()
)


def is_plural(word):
	# -s form of another word in the dictionary, e.g. cats, boxes, flies
	if not word.endswith('s') or word.endswith('ss'):
		return False
	return (
		word[:-1] in dictionary or
		(word.endswith('es') and word[:-2] in dictionary) or
		(word.endswith('ies') and word[:-3] + 'y' in dictionary)
	)


common = [
	w for w in words
	if zipf_frequency(w, 'en') >= MIN_ZIPF and not is_plural(w)
]

with open(os.path.join(here, 'common-nines.txt'), 'w') as f:
	f.write('\n'.join(common) + '\n')
