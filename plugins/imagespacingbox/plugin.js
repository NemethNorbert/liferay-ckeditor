(function () {
	'use strict';
	CKEDITOR.plugins.add('imagespacingbox', {
		init: function (editor) {
			CKEDITOR.on('dialogDefinition', function (event) {
				var dialogDefinition = event.data.definition;

				var dialog = event.data.dialog;

				if (dialog.getName() === 'image2') {
					var infoTab = dialogDefinition.getContents('info');

					if (infoTab.get('spacingBox')) {
						return;
					}

					var spacingBox = {
						children: [
							{
								children: [
									{
										commit: function (widget) {
											widget.setData(
												'hspace',
												this.getValue()
											);

											var hspace = widget.data.hspace;

											var imageElement =
												widget.parts.image;

											if (imageElement && hspace) {
												imageElement.setStyles({
													'margin-left':
														hspace + 'px',
													'margin-right':
														hspace + 'px',
												});
											}
										},
										id: 'hspace',
										label: editor.lang.image.hSpace,
										requiredContent:
											'img{margin-left,margin-right}',
										setup: function (widget) {
											this.setValue(widget.data.hspace);
										},
										type: 'text',
										validate: CKEDITOR.dialog.validate.integer(
											editor.lang.image.validateHSpace
										),
									},
								],
								type: 'hbox',
							},
							{
								children: [
									{
										commit: function (widget) {
											widget.setData(
												'vspace',
												this.getValue()
											);

											var vspace = widget.data.vspace;

											var imageElement =
												widget.parts.image;

											if (imageElement && vspace) {
												imageElement.setStyles({
													'margin-bottom':
														vspace + 'px',
													'margin-top': vspace + 'px',
												});
											}
										},
										id: 'vspace',
										label: editor.lang.image.vSpace,
										requiredContent:
											'img{margin-top,margin-bottom}',
										setup: function (widget) {
											this.setValue(widget.data.vspace);
										},
										type: 'text',
										validate: CKEDITOR.dialog.validate.integer(
											editor.lang.image.validateVSpace
										),
									},
								],
								type: 'hbox',
							},
						],
						id: 'spacingBox',
						type: 'hbox',
					};

					infoTab.add(spacingBox);
				}
			});
		},
	});
})();
