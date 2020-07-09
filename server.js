$(document).ready(function () {
  init();

  function init() {
    stockx();
    stockXSearch();
  }

  function stockx() {
    $("#btnSearch").on("click", function (e) {
      e.preventDefault();

      query = $("#query").val();
      shoeBrand = $("#shoeBrand").val();
      shoeYr = $("#shoeYr").val();
      shoeGdr = $("#shoeGdr").val();
      console.log(shoeBrand, shoeYr, query, shoeGdr);
      stockXSearch();
    });
  }

  function stockXSearch() {
    $.ajax({
      type: "GET",
      url: `https://stockx.com/api/browse?&_search=${query}&year=${shoeYr}&brand=${shoeBrand}&gender=${shoeGdr}`,
      dataType: "json",
    }).then(function (response) {
      console.log(response);
      let shoe = response;
      const year = shoe.Products[0].year;
      const brand = shoe.Products[0].brand;
      const PID = shoe.Products[0].styleId;
      const name = shoe.Products[0].shoe;
      const gender = shoe.Products[0].gender;
      const colorway = shoe.Products[0].colorway;
      const msrp = shoe.Products[0].retailPrice;
      const mV = shoe.Products[0].market.lastSale;
      const img = shoe.Products[0].media.smallImageUrl;

      $("#result").html(`
        <div class="container">
          <div class="row">
            <div class="col-sm-8 text-center">
              <div class="card shadow">
                <h2>
                   ${year} ${brand} ${name} ${msrp}
                </h2>
                <h4>
                  ${PID} - ${gender}
                </h4>
                <h3> ${colorway}</h3>
                <h3> Current Value ${mV}</h3>
                <img src="${img}" alt="" />
              </div>
            </div>
          </div>
        </div>
        `);
    });
  }
});
