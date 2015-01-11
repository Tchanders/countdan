<div class="row">
	<div class="col-md-8">
		<div class="countdan-panel game-panel">
			<?php
				include $game . 'panel.php';
			?>
		</div>
	</div>
	<div class="col-md-4">
		<div class="countdan-panel clock-panel"></div>
	</div>
</div>

<div class="row">
	<div class="col-md-8">
		<div class="countdan-panel rules-panel">
			<h3>Rules</h3>
			<ul>
				<?php
					include $game . 'rules.php';
				?>
			</ul>
		</div>
	</div>
	<div class="col-md-4">
		<div class="countdan-panel solutions-panel">
			<h3>Solutions</h3>
			<div class="ingame-button gamepage-button gamepage-showsolutions button-disabled">Show solutions</div>
			<div class="gamepage-solutions"></div>
		</div>
	</div>
</div>

<script src="js/clock.js"></script>
<script src="js/letters.js"></script>
<script src="js/<?php echo $game . '.js';?>"></script>
<script src="js/<?php echo $game . 'setup.js';?>"></script>