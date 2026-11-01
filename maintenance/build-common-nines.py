#!/usr/bin/env python3
# Writes common-nines.txt: the nine-letter words from brit-a-z.txt that are
# common enough to be used as conundrums.
#
# Requires wordfreq (`pip install wordfreq`). The output is committed, so this
# only needs re-running if the word list or threshold changes.

import os

from wordfreq import zipf_frequency

# Zipf scale: 3 is roughly once per million words, 2.5 is about a third of that
MIN_ZIPF = 2.5

here = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(here, 'brit-a-z.txt'), encoding='latin-1') as f:
	words = sorted({
		line.strip() for line in f
		if len(line.strip()) == 9 and line.strip().isalpha() and line.strip().islower()
	})

common = [w for w in words if zipf_frequency(w, 'en') >= MIN_ZIPF]

with open(os.path.join(here, 'common-nines.txt'), 'w') as f:
	f.write('\n'.join(common) + '\n')
