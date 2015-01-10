<div class="row">
	<div class="col-sm-8">
		<div class="countdan-panel game-panel">
			<?php
				include $game . 'panel.php';
			?>
		</div>
	</div>
	<div class="col-sm-4">
		<div class="countdan-panel clock-panel">
			<svg class="clock-image" viewbox="0 0 250 250">
				<circle cx="125" cy="125" r="120" stroke="blue" stroke-width="10" fill="#ccc"/>
				<path id="border" transform="translate(125, 125) scale(.92)" fill="#fff" />
				<path id="loader" transform="translate(125, 125) scale(.5)" fill="#ccc" />
				<path d="M 125 10 L 125 240" stroke="#999" stroke-width="2" />
				<path d="M 10 125 L 240 125" stroke="#999" stroke-width="2" />
				<path id="hand" d="M 120 125 L 125 10 L 130 125" fill="#666" />
				<circle cx="125" cy="125" r="10" fill="#666"/>
			</svg>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-sm-8">
		<div class="countdan-panel rules-panel">
			<h3>Rules</h3>
			
		</div>
	</div>
	<div class="col-sm-4">
		<div class="countdan-panel solutions-panel">
			<h3>Solutions</h3>
			<div class="gamepage-button gamepage-showsolutions">Show solutions</div>
			<div class="gamepage-solutions"></div>
		</div>
	</div>
</div>

<script src="clock.js"></script>
<!-- is this line needed? -->
<script src="letters.js"></script>
<script src="<?php echo $game . '.js';?>"></script>
<script src="<?php echo $game . 'setup.js';?>"></script>