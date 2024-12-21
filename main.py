from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Initial list of users (for reference, this can be extended to include more logic if needed)
persons = [
    {"id": 1, "first_name": "Mostafa", "last_name": "Hisham", "email": "moustafa40540@gmail.com", "phone": "01001206488", "password": 123456, "gender": "male", "birthdate": "10/07/2004"},
    {"id": 2, "first_name": "Refaat", "last_name": "Elia", "email": "Refaat@gmail.com", "phone": "01272360822", "password": 123456, "gender": "male", "birthdate": "01/10/2004"},
    {"id": 3, "first_name": "Abdelrahman", "last_name": "Mohamed", "email": "Abdelrahman@gmail.com", "phone": "01066563930", "password": 123456, "gender": "male", "birthdate": "29/09/2004"},
    {"id": 4, "first_name": "Omar", "last_name": "Ayman", "email": "Omar@gmail.com", "phone": "01284944659", "password": 123456, "gender": "male", "birthdate": "03/09/2004"},
    {"id": 5, "first_name": "Mario", "last_name": "Wael", "email": "Mario@gmail.com", "phone": "01001206488", "password": 123456, "gender": "male", "birthdate": "03/10/2004"},
    {"id": 6, "first_name": "Ziad", "last_name": "Mohamed", "email": "Ziad@gmail.com", "phone": "01001206488", "password": 123456, "gender": "male", "birthdate": "03/10/2004"},
    {"id": 7, "first_name": "Samuel", "last_name": "Malak", "email": "Samuel@gmail.com", "phone": "01001206488", "password": 123456, "gender": "male", "birthdate": "03/10/2004"}


]

books = [
    {
        "id": 1,
        "bookTitle": "Introduction to Algorithms",
        "bookDescription": "introduction to algorithms uniquely combines rigor and comprehensiveness",
        "bookImage": "https://www.booksfree.org/wp-content/uploads/2022/02/introduction-to-algorithms-3rd-edition-pdf.jpg",
        "bookPdf": "https://www.infobooks.org/pdfview/6628-introduction-to-algorithms-jon-kleinbergeva-tardos/",
        "bookWriter": "Jon Kleinberg,Eva Tardo",
        "bookAuthor": "Jon Kleinberg,Eva Tardos",
        "category": "educational",
        "price": "199"
    },
    {
        "id": 2,
        "bookTitle": "Computer Network",
        "bookDescription": "An epic tale of heroism and discovery.",
        "bookImage": "https://m.media-amazon.com/images/I/51qgdhfkl9L.jpg",
        "bookPdf": "https://www.infobooks.org/pdfview/computer-network-sh-dharmender-kumardr-manoj-dhun-377/",
        "bookWriter": " Sh Dharmender Kumar,Dr Manoj Dhun",
        "bookAuthor": " Sh Dharmender Kumar,Dr Manoj Dhun",
        "category": "educational",
        "price": 299
    },
    {
        "id": 3,
        "bookTitle": "Artificial Intelligence and Librarianship",
        "bookDescription": "Wait a few seconds for the document to load, ",
        "bookImage": "https://www.copyright.com/wp-content/uploads/2017/08/artificial-intelligence-corporate-librarians.png",
        "bookPdf": "https://www.infobooks.org/pdfview/artificial-intelligence-and-librarianship-martin-fricke-390/",
        "bookWriter": "Martin Frické",
        "bookAuthor": "Martin Frické",
        "category": "Educational",
        "price": "1000"
    },
    {
        "id": 4,
        "bookTitle": "Database Engineering",
        "bookDescription": "Database Engineers design strategies for enterprise databases, data warehouse systems, and multidimensional networks.",
        "bookImage": "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18141.jpg",
        "bookPdf": "https://www.infobooks.org/pdfview/6687-database-engineering-subasish-mohapatra/",
        "bookWriter": "Subasish Mohapatra",
        "bookAuthor": "Subasish Mohapatra",
        "category": "Educational",
        "price": 499
    },
    {
        "id": 5,
        "bookTitle": "Cyber Security",
        "bookDescription": "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.",
        "bookImage": "https://www.theforage.com/blog/wp-content/uploads/2022/12/what-is-cybersecurity.jpg",
        "bookPdf": "https://www.infobooks.org/pdfview/6687-database-engineering-subasish-mohapatra/",
        "bookWriter": "Wei Lu, Yuqing Zhang, Weiping Wen, Hanbing Yan, Chao Li",
        "bookAuthor": "Wei Lu, Yuqing Zhang, Weiping Wen, Hanbing Yan, Chao Li",
        "category": "Educational",
        "price": 599
    },
    {
        "id": 6,
        "bookTitle": "Introduction to machine learning",
        "bookDescription": " ",
        "bookImage": "https://www.simplilearn.com/ice9/ebooks/MachineLearning_ebookbanner.jpg",
        "bookPdf": "https://www.infobooks.org/pdfview/14159-introduction-to-machine-learning-nils-j-nilsson/",
        "bookWriter": " Nils J. Nilsson",
        "bookAuthor": "Nils J. Nilsson",
        "category": "educational",
        "price": 699
    },
    {
        "id": 7,
        "bookTitle": "Data Analysis in the Psychological Sciences",
        "bookDescription": "The term psychological science refers to the accumulated body of psychological knowledge.",
        "bookImage": "https://www.actu-environnement.com/images/illustrations/news/43173_large.jpg",
        "bookPdf": "https://www.infobooks.org/pdfview/17698-data-analysis-in-the-psychological-sciences-a-practical-applied-multimedia-approach-leyre-castro-j-toby-mordkoff/",
        "bookWriter": "Leyre Castro, J. Toby Mordkoff",
        "bookAuthor": "Leyre Castro, J. Toby Mordkoff",
        "category": "Educational",
        "price": 799
    },
    {
        "id": 9,
        "bookTitle": "Introduction to Scrum",
        "bookDescription": "Scrum is an agile project management framework that helps teams structure and manage their work through a set of values, principles, and practices.",
        "bookImage": "https://scrumevolution.com/wp-content/uploads/2022/06/AdobeStock_415561625-600x400.jpeg",
        "bookPdf": "https://www.infobooks.org/pdfview/14256-introduction-to-scrum-evan-leybourn/",
        "bookWriter": "Evan Leybourn",
        "bookAuthor": "Evan Leybourn",
        "category": "Educational",
        "price": 1000
    },
    {
        "id": 10,
        "bookTitle": "Introduction to Programming Using Java",
        "bookDescription": "Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself.",
        "bookImage": "https://www.infoworld.com/wp-content/uploads/2024/06/java_binary_code_gears_programming_coding_development_by_bluebay2014_gettyimages-1040871468_2400x1600-100795798-orig.jpg?quality=50&strip=all",
        "bookPdf": "https://www.infobooks.org/pdfview/introduction-to-programming-using-java-david-j-eck-210/",
        "bookWriter": "David J. Eck",
        "bookAuthor": "David J. Eck",
        "category": "Educational",
        "price": 950
    }
    ]
# ***************************Pages routes***************************#

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/bookServices')
def bookServices():
    return render_template('bookServices.html', books=books)

@app.route('/userServices')
def userServices():
    return render_template('userServices.html',persons=persons)

@app.route('/viewUser')
def viewUser():
    return render_template('viewUser.html')

@app.route('/updateUser')
def updateUser():
    return render_template('updateUser.html')

@app.route('/addUser')
def addUser():
    return render_template('addUser.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/addBook')
def addBook():
    return render_template('addBook.html')

@app.route('/upDate')
def upDate():
    return render_template('upDate.html')

@app.route('/viewBook')
def viewBook():
    return render_template('viewBook.html')

# ***************************User routes***************************#

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(persons)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = next((person for person in persons if person['id'] == user_id), None)
    if user:
        return jsonify(user), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/add_user', methods=['POST'])
def add_user():
    new_user = {
        'id': request.json.get('id'),
        'first_name':  request.json.get('first_name'),
        'last_name': request.json.get('last_name'),
        'email': request.json.get('email'),
        'password': request.json.get('password'),
        'phone': request.json.get('phone'),
        'gender': request.json.get('gender'),
        'birthdate': request.json.get('birthdate'),
    }
    
    persons.append(new_user)
    return jsonify({'success': True, 'message': 'User created successfully'}), 201


@app.route('/deleteUser/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global persons  # Ensure the persons list is globally accessible
    person = next((person for person in persons if person['id'] == user_id), None)
    
    if person:
        persons.remove(person)  # Correctly remove the person from persons
        return jsonify({'success': True, 'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404
    

    
@app.route('/updateUser/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    # Find the user by ID
    user = next((user for user in persons if user['id'] == user_id), None)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Get the JSON data from the request
    data = request.json
    if not data:
        return jsonify({'error': 'Invalid or missing JSON data'}), 400

    # Update only the fields provided in the request
    for key, value in data.items():
        if key in user:  # Ensure the field exists in the user object
            user[key] = value

    return jsonify({'success': True, 'message': 'User updated successfully', 'user': user}), 200



# ***************************Books routes***************************#


@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)


@app.route('/addBook', methods=['POST'])
def add_book():
    # Get data from the incoming request
    new_book = {
        'bookTitle': request.json.get('bookTitle'),
        'bookAuthor': request.json.get('bookAuthor'),
        'bookDescription': request.json.get('bookDescription'),
        'bookImage': request.json.get('bookImage'),
        'bookPdf': request.json.get('bookPdf'),
        'bookWriter': request.json.get('bookWriter'),  # This field matches with the JS field `bookWriter`
        'category': request.json.get('category'),
        'price': request.json.get('price')
    }
    # Append new book to the in-memory list
    books.append(new_book)
    # Return success message
    return jsonify({'success': True, 'message': 'Book added successfully'}), 201

@app.route('/deleteBooks/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    global books  # Ensure the books list is globally accessible
    book = next((book for book in books if book['id'] == book_id), None)
    
    if book:
        books.remove(book)
        return jsonify({'success': True, 'message': 'Book deleted successfully'}), 200
    else:
        return jsonify({'error': 'Book not found'}), 404

@app.route('/getBooks/<int:book_id>', methods=['GET'])
def get_book_by_id(book_id):
    global books  # Ensure the books list is globally accessible
    book = next((book for book in books if book['id'] == book_id), None)
    
    if book:
        return jsonify(book), 200
    else:
        return jsonify({'error': 'Book not found'}), 404

@app.route('/updateBooks/<int:book_id>', methods=['PATCH'])
def update_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if not book:
        return jsonify({'error': 'Book not found'}), 404

    # Get the JSON data from the request
    data = request.json

    # Update only the fields provided in the request
    for key, value in data.items():
        if key in book:  # Ensure the field exists in the book object
            book[key] = value

    return jsonify({'success': True, 'message': 'Book updated successfully', 'book': book}), 200

if __name__ == "__main__":
    app.run(debug=True)
