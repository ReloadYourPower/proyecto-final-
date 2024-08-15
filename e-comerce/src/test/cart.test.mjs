
describe('Testing products',()=>{
    let chail;
    let expect;
    const productRepositori = 'productosssss';
    before(async function (){
       let chai = await import('chai');
       let expect = chai.expect;
       const app = require('../app'); 
        // se ejecuta una unica vez antes de todos los test 
        this.timeout(10000);
        chai.request(app) 
        .post('/profile/carts')
        .send({ userId: 'someUserId' }) // Ajusta los datos de prueba según tu implementación
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('cart');
          expect(res.body.cart).to.have.property('userId', 'someUserId');
          done();
        });
    })
})