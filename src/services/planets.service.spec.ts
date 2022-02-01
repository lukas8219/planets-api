import { createMock } from "ts-auto-mock";
import { PlanetService } from "./planet.service";
import { On, method} from 'ts-auto-mock/extension';
import { PlanetRepositoryImpl } from "src/repository/PlanetRepositoryImp";
import { Planet } from "src/data/domain/planet.entity";

describe('Test', () => {

    test('Should returning valid object', async () => {

        const id = 1;

        const repo = createMock<PlanetRepositoryImpl>();
        const mockedMethod = On(repo).get(method(mock => mock.findById));
        mockedMethod.mockImplementation(async(id) => {
            return new Planet({id, name:'mock', terrain:'mock'});
        });
        const service = new PlanetService(repo);
        const result = await service.getById(id);

        expect(mockedMethod).toHaveBeenCalled();
        expect(result).toBeDefined();
        expect(result.getId()).toBe(id);
        expect(result.getName()).toBe('mock');
        expect(result.getTerrain()).toBe('mock');
    });

});