const ReadingService = require('../../src/services/ReadingService');

//Declaration des mocks
//repo associer (reading et comment) et on les simules

const readingRepository = {
    getAllCommentsByReadingId: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
};

const commentRepository = {
    create: jest.fn()
};

//instanciation de ma classe avec les repo simuler
const readingService = new ReadingService(readingRepository, commentRepository);

//Reset des tests
beforeEach(() => jest.clearAllMocks());

describe('ReadingService', ()=>{
    //On test la methode update
    it('update met a jour un commentaire et le status', async ()=>{
        const reading = {
            idReading: 42,
            userId: 1,
            pageNbr: 100,
            nbrPages: 100,
            content: 'Excellent livre.'
        }
        await readingService.update(reading);

        expect(commentRepository.create).toHaveBeenCalledWith({
            readingId: 42,
            pageNbr: 100,
            content: 'Excellent livre.'
        });
        expect(readingRepository.update).toHaveBeenCalledWith({
            progress: 100,
            statusId: 3,
            idReading: 42,
            userId: 1,
        });
    });
    //On test le methode getAllCommentsByReadingId
    it('getAllCommentsByReadingId retourne les commentaires du repository', async ()=>{
        const comments = [{pageNbr:1, content:'Debut du livre'}];
        readingRepository.getAllCommentsByReadingId.mockResolvedValue(comments);

        const result = await readingService.getAllCommentsByReadingId({idReading: 1, userId: 7});

        expect(result).toBe(comments);
        expect(readingRepository.getAllCommentsByReadingId).toHaveBeenCalledWith({
            idReading: 1,
            userId: 7
        });
    });
    //On test create
    it('create appelle readingRepository.create avec les bons paramètres', async ()=>{
        const newReading = {bookId: 15, userId: 7};
        readingRepository.create.mockResolvedValue({idReading: 99, ...newReading});

        const result = await readingService.create(newReading);

        expect(readingRepository.create).toHaveBeenCalledWith(newReading);
        expect(result).toEqual({idReading:99, bookId:15, userId:7});
    });
});