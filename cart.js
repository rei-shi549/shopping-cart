//合計金額を計算、出力する関数
function updateTotal() {
	var sum = 0;
	$("#cart .item").each(function() {
		var price = parseInt($(this).data("price"), 10);
		var quantityText = $(this).children("div").children(".pieces").text(); // "×2" のような形式
		var quantity = parseInt(quantityText.replace("×", ""), 10);
		if (isNaN(price)) price = 0;
		if (isNaN(quantity)) quantity = 0;
		sum += price * quantity;
	});
	$("#total").text("￥" + sum.toLocaleString());
}

$(function(){
	$(".item button").click(function(){
		parentInput = $(this).closest(".item");
		amount = parentInput.find("input.kazu").val() *1;
		if (amount <= 0 || isNaN(amount)) {
			alert("数量は1以上の数値を入力してください");
			return;
		}

		// 商品画像のsrcを取得（商品識別に使用する）
		fname = parentInput.find("img").attr("src");
		itemId = parentInput.attr("data-id");

		// カート内に同じ商品があるかチェック
		check = false;
		$("#cart .item").each(function(){
			cartImg = $(this).find("img").attr("src");
			if(cartImg == fname){
				// すでにある商品の数量を取得して加算
				piecesText = $(this).find(".pieces").text();
				temp = piecesText.replace("×", "") * 1;
				var currentAmount;
				if (isNaN(temp)) {
					currentAmount = 0;
				} else {
					currentAmount = temp;
				}
				newAmount = currentAmount + amount;
				$(this).find(".pieces").text("×" + newAmount);
				$(this).effect("bounce");
				check = true;
			}
		});

		// カート内に同じ商品がなければ新しく追加
		if(!check){
			c = parentInput.clone();
			c.find("form").remove();
			c.find(".pieces").text("×" + amount);
			c.find("button").text("remove Cart");
			c.find("button").on("click", function(){
				$(this).parent().effect("puff", function(){
					$(this).remove();
					updateTotal();
				});
			});
			c.attr("data-id", itemId);
			c.attr("data-price", parentInput.data("price"));
			$("#cart").append(c);
			c.effect("bounce");
		}
	updateTotal();
	});
});