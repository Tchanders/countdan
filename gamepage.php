<div class="row">
	<div class="col-md-8 countdan-col">
		<div class="countdan-panel game-panel">
			<?php
				include $game . 'panel.php';
			?>
		</div>
	</div>
	<div class="col-md-4 countdan-col">
		<div class="countdan-panel clock-panel"></div>
	</div>
</div>

<div class="row">
	<div class="col-md-8 countdan-col">
		<div class="countdan-panel rules-panel">
			<h3>Rules</h3>
			<hr>
			<ul>
				<?php
					include $game . 'rules.php';
				?>
			</ul>
		</div>
	</div>
	<div class="col-md-4 countdan-col">
		<div class="countdan-panel solutions-panel">
			<h3>Solutions</h3>
			<hr>
			<div class="ingame-button gamepage-button gamepage-showsolutions button-disabled">Show solutions</div>
			<div class="gamepage-solutions"></div>
		</div>
	</div>
</div>
