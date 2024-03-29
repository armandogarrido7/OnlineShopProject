class View {
    static showLogin() {
        main.id = "login";
        main.innerHTML = "<div><h3>Login</h3><div class='form'><input type='email' id='login_email' placeholder='Email'><input type='password' id='login_password' placeholder='Password'><button id='log_in'>Log in</button></div></div> <div><h3>Sign Up</h3><div class='form'><input type='text' id='name' placeholder='Name'><input type='text' id='surnames' placeholder='Surnames'><input type='phone' id='phone' placeholder='Phone'><input type='email' id='email' placeholder='Email'><input type='password' id='password' placeholder='Password'><button id='sign_up'>Sign Up</button></div></div>";
        document.getElementById('log_in').onclick = () => {
            Controller.clickOnLoginBtn();
        }
        document.getElementById('sign_up').onclick = () => {
            Controller.clickOnSignUpBtn();
        }

    }
    static showCart() {
        let products = Model.getCartProducts();
        main.id = "shopping_cart"
        main.innerHTML = "<h2>Shopping Cart</h2>";
        products = products.filter(n => n);
        if (products.length != 0) {
            for (let product of products) {
                if (product) {
                    main.innerHTML += "<div class='cart_product' id='" + product.id + "'><h3>" + product.title + "</h3><img src=" + product.image + "><div class='price'>" + (product.price * product.quantity).toFixed(2) + "€ </div><div class='input_div'><input type='number' id=" + product.id + " class='product_quantity'  min=1 max=99 step=1 value=" + product.quantity + "> uds</div><i id='" + product.id + "'class='fa-solid fa-trash fa-xl'></i></div>";
                }
            }
            let subtotal = Model.getCartPrice();
            let shipping = 4.99;
            if (Model.getCartPrice() > 50) {
                shipping = 0;
            }
            let shipping_text = (shipping == 0 ? "<div class='free_shipping'>4.99€</div> - <span>FREE!</span>" : "<span>4.99€</span>");
            console.log(shipping_text)
            main.innerHTML += "<div id='summary'><div>Subtotal <span>" + subtotal.toFixed(2) + "€</span></div><div>Shipping " + shipping_text + "</div><hr><div>Total <span>" + (subtotal + shipping).toFixed(2) + "€</span></div><button id='buy_btn'>Buy</button></div>";
            $(".fa-trash").click(function() {
                Model.removeProductFromCart($(this)[0].id);
                View.showCart();
            })
            $(".product_quantity").change(function() {
                Model.changeProductQuantity($(this)[0].id, $(this).val())
                View.showCart();
            });
        } else {
            main.innerHTML += "<h3>Your shopping cart is empty!</h3>"
        }
    }
    static showProducts(products) {
        View.hideLoading();
        main.id = "products"
        main.innerHTML = "<h3>" + products[0].category.charAt(0).toUpperCase() + products[0].category.slice(1); + "</h3>";
        let sorted_products = products.sort((a, b) => {
            if (a.price < b.price) {
                return 1;
            }
            if (a.price > b.price) {
                return -1;
            }
            return 0;
        });
        let sort_select = document.createElement("select");
        sort_select.options.add(new Option("Descending Price", "desc"));
        sort_select.options.add(new Option("Ascending Price", "asc"));
        main.appendChild(sort_select);
        for (let product of sorted_products) {
            main.innerHTML += "<div class='product' id='" + product.id + "'><div class='product_img'><img src='" + product.image + "'></div><div class='product_data'><div>" + product.title + "</div><div class='product_price'>" + product.price + "€</div></div></div >";
            $('.product').last().attr('price', product.price);
        }
        $(".product").click(function() {
            Controller.clickOnProduct($(this)[0].id);
        });
        $("select").change(function() {
            let products = [].slice.call(document.getElementsByClassName('product'));
            let sorted_products = products.sort((a, b) => { return a.getAttribute('price') - b.getAttribute('price') });
            if ($(this).val() == 'desc') {
                sorted_products = sorted_products.reverse();
            }
            $('.product').remove();
            for (let product of sorted_products) {
                main.appendChild(product);
            }
        })
    }
    static showHome() {
        main.id = 'home';
        main.innerHTML = '<div id="slider"><div class="mySlides fade"><img src="./img/slider_1.jpg" style="width:100%"></div><div class="mySlides fade"><img src="./img/slider_2.jpg" style="width:100%"></div><div class="mySlides fade"><img src="./img/slider_3.jpg" style="width:100%"></div><div class="mySlides fade"><img src="./img/slider_4.jpg" style="width:100%"></div><div class="mySlides fade"><img src="./img/slider_5.jpg" style="width:100%"></div><div id="progress_bar"></div></div><h2 id="new_products">Discover our new products</h2><div id="men" class="category_link"><img src="https://staticpages.mngbcn.com/homes/images/fw22/he/noviembre/landing__he3.jpg" alt="men"></div><div id="women" class="category_link"><img src="https://staticpages.mngbcn.com/homes/images/fw22/she/diciembre/she_landing_vestidos_1912.jpg?imwidth=505&amp;imdensity=1&amp;impolicy=set_13&quot" alt="women"></div><div id="jewelery" class="category_link"><img src="https://media.istockphoto.com/id/1338646661/photo/gold-jewelry-diamond-rings-show-in-luxury-retail-store-window-display-showcase.jpg?b=1&s=170667a&w=0&k=20&c=IjIyYsOhjFangGZVqki_9YHTtbN3JBFyQs7GXPA_eV0=" alt="jewelery"></div><div id="electronics" class="category_link"><img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg" alt="women"></div><div id="newsletter"><h2>Subscribe to our newsletter!</h2><input type="email"></div>';
    }
    static showNav() {
        nav.style.display = "flex";
    }
    static hideNav() {
        nav.style.display = "none";
    }
    static showProductPage(product) {
        View.hideLoading();
        main.id = "product_page";
        main.innerHTML = "<h2 id='product_title'>" + product.title + "</h2><img src='" + product.image + "' id='product_img'><h4 id='product_price'>" + product.price + "€</h4><p>" + product.description + "</p><div id='quantity'>Quantity <input id='product_quantity' type='number' min=0 max=99 size=2 value=1></div><div id='add_to_cart'><i class='fa-solid fa-cart-plus fa-xl'></i> Add to Cart </div><div id='rating'><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span> " + product.rating.count + " votes<div>";
        let stars = document.getElementsByClassName("fa-star");
        for (let i = 0; i < Math.round(product.rating.rate); i++) {
            stars[i].classList.add("checked");
        }
        $('#add_to_cart').click(function() {
            $(this).addClass("lime_background");
            $(this).html("<i class='fa-solid fa-cart-arrow-down fa-xl'></i>Product added!");
            setTimeout(() => {
                $(this).html("<i class='fa-solid fa-cart-plus fa-xl'></i>Add to Cart");
                $(this).removeClass("lime_background");
            }, 2000)
            Model.addToCart(product, Number($("#product_quantity").val()));

        });
    }
    static unselectCategories() {
        $(".category").each(function() {
            $(this).removeClass("selected");
        });
    }
    static showLoading() {
        $("header").css({ "opacity": "50%" });
        $("header").css({ "main": "50%" });
        $("header").css({ "footer": "50%" });
        $(".loading").addClass('show_loading');
    }
    static hideLoading() {
        $("header").css({ "opacity": "100%" });
        $("header").css({ "main": "100%" });
        $("header").css({ "footer": "100%" });
        $(".loading").removeClass("show_loading");
    }
    static showSuccessfullyRegister() {
        main.id = 'successfully_register';
        main.innerHTML = '<h3>User Registered Successfully</h3>';
    }
}
class Model {
    static checkLoggedUser(username, password) {
        let request = new XMLHttpRequest();
        request.open("POST", "https://fakestoreapi.com/auth/login", true);
        request.onreadystatechange = () => {
            if (request.readyState == XMLHttpRequest.DONE) {
                View.hideLoading();
                if (request.status == 200) {
                    console.log('login correcto');
                } else {
                    console.log('NO login');
                }
            }
        };
        request.send(JSON.stringify({ "username": username, "password": password }));
        View.showLoading();
    }
    static sendRequest(request_text, action) {
        let request = new XMLHttpRequest();
        request.open('GET', request_text, true);
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/json');
        request.onreadystatechange = () => { this.dealResponse(request, action) };
        request.send();
    }
    static dealResponse(request, action) {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            let response_json = JSON.parse(request.responseText);
            action(response_json);

        }
    }
    static getAllProducts() {

    }
    static getProduct(product_id) {
        View.showLoading();
        let request_text = "https://fakestoreapi.com/products/" + product_id;
        fetch(request_text).then(res => res.json()).then(json => View.showProductPage(json));
    }
    static getCategory(category_text) {
        View.showLoading();
        let category = "";
        if (category_text == "Men") {
            category = "men's%20clothing";
        } else if (category_text == "Women") {
            category = "women's%20clothing";
        } else if (category_text == "Jewelery") {
            category = "jewelery";
        } else if (category_text == "Electronics") {
            category = "electronics";
        }
        let request_text = "https://fakestoreapi.com/products/category/" + category;
        fetch(request_text).then(res => res.json()).then(json => View.showProducts(json));
    }
    static addToCart(product, quantity) {
        var cart = this.getCartProducts();
        if (cart) {
            if (cart[product.id]) {
                product.quantity = cart[product.id].quantity + quantity;
                cart[product.id] = product;
            } else {
                product.quantity = quantity;
                cart[product.id] = product;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            let new_cart = [];
            new_cart[product.id] = product;
            localStorage.setItem('cart', JSON.stringify(new_cart));
        }
    }
    static getCartProducts() {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
        return [];
    }
    static removeProductFromCart(product_id) {
        let cart = this.getCartProducts();
        cart[product_id] = null;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static changeProductQuantity(product_id, quantity) {
        let cart = this.getCartProducts();
        cart[product_id].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getCartPrice() {
        let cart = this.getCartProducts();
        let price = 0;
        for (let product of cart) {
            if (product) {
                price += product.price * product.quantity;
            }
        }
        return price;
    }
}
class Controller {
    static clickOnCart() {
        View.showCart();

    }
    static clickOnCategory(category) {
        Model.getCategory(category);
    }
    static clickOnProduct(product_id) {
        Model.getProduct(product_id);
    }
    static clickOnLoginBtn() {
        let username = document.getElementById('login_email');
        let password = document.getElementById('login_password');
        Model.checkLoggedUser(username, password);
    }
    static clickOnSignUpBtn() {
        let name = $("#name").val();
        let surnames = $("#surnames").val();
        let phone = $("#phone").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let request_text = "https://api.emailjs.com/api/v1.0/email/send"
        var data = {
            service_id: 'service_2vj0jqt',
            template_id: 'template_k2t1x4h',
            user_id: 'OMTzvYPy-dCjSCRP2',
            template_params: {
                'from_name': 'Online Shop',
                'to_name': name + " " + surnames,
                'to_email': email,
                'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
            }
        };
        View.showLoading();
        fetch('https://fakestoreapi.com/users', {
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "username": email,
                    "password": password,
                    "name": {
                        "firstname": name,
                        "lastname": surnames
                    },
                    "address": {
                        "city": 'kilcoole',
                        "street": '7835 new road',
                        "number": 3,
                        "zipcode": '12926-3874',
                        "geolocation": {
                            "lat": '-37.3159',
                            "long": '81.1496'
                        }
                    },
                    "phone": phone
                })
            })
            .then(res => res.json())
            .then(json => {
                View.hideLoading();
                View.showSuccessfullyRegister();
                setTimeout(() => {
                    View.showNav();
                    View.showHome();
                }, 3000)

            });
        fetch(request_text, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    }
}

window.onload = () => {
    emailjs.init('OMTzvYPy-dCjSCRP2');
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("mySlides");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        if (slides.length != 0) {
            slides[slideIndex - 1].style.display = "block";
        }
        setTimeout(showSlides, 2000);
    }
    main = document.getElementsByTagName("main")[0];
    nav = document.getElementsByTagName("nav")[0];
    show_nav_btn = document.getElementById("show_menu");
    categories = document.getElementsByClassName("category");
    home_btn = document.getElementById("show_home");
    home_btn.addEventListener("click", () => {
        View.showHome();
        for (category of categories) {
            category.classList.remove('selected');
        }
        $("#men").click(function() {
            Controller.clickOnCategory('Men');
        });
        $("#women").click(function() {
            Controller.clickOnCategory('Women');
        });
        $("#jewelery").click(function() {
            Controller.clickOnCategory('Jewelery');
        });
        $("#electronics").click(function() {
            Controller.clickOnCategory('Electronics');
        });
    })
    login_btn = document.getElementById("show_login");
    login_btn.addEventListener("click", () => {
        View.showLogin();
        for (category of categories) {
            category.classList.remove('selected');
        }
    });
    cart_btn = document.getElementById("show_cart");
    cart_btn.addEventListener("click", () => {
        for (category of categories) {
            category.classList.remove('selected');
        }
        Controller.clickOnCart();
    });
    show_nav_btn.addEventListener("click", () => {
        if (nav.classList.contains("mobile_shown")) {
            nav.classList.remove("mobile_shown");
        } else {
            nav.classList.add("mobile_shown");
        }
    });
    for (div of document.getElementsByClassName("category")) {
        div.addEventListener("click", (e) => {
            for (category of categories) {
                category.classList.remove('selected');
            }
            e.target.classList.add('selected');
            Controller.clickOnCategory(e.target.innerHTML);
        })
    }
    $("#men").click(function() {
        Controller.clickOnCategory('Men');
    });
    $("#women").click(function() {
        Controller.clickOnCategory('Women');
    });
    $("#jewelery").click(function() {
        Controller.clickOnCategory('Jewelery');
    });
    $("#electronics").click(function() {
        Controller.clickOnCategory('Electronics');
    });
}