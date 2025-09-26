def test_signup(client):
    response = client.post('/signup', json={
        'name': 'TestUser',
        'email': 'test@example.com',
        'password': 'pass123',
        'role': 'student'
    })
    assert response.status_code == 201

def test_login(client):
    response = client.post('/login', json={
        'email': 'test@example.com',
        'password': 'pass123'
    })
    assert response.status_code == 200
