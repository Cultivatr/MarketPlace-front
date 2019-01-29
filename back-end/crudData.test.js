const crudData = require('./routes/crudData.js');
describe('read dummy data', () => {
	it('expect to get Offered items for user Id 1', async () => {
		expect.assertions(1);
		let offeredItems = await crudData.getOfferedItemByUserId(1);
		expect(offeredItems.length).toBe(2);
	});

	it('expect to get Offered items for user Id 2', async () => {
		expect.assertions(1);
		let offeredItems = await crudData.getOfferedItemByUserId(2);
		expect(offeredItems.length).toBe(6);
	});

	it('expect to get Offered items for user Id undefined', async () => {
		expect.assertions(1);
		let offeredItems = await crudData.getOfferedItemByUserId(undefined);
		expect(offeredItems.length).toBe(0);
	});

	it('test attributes of queried offered items', async () => {
		expect.assertions(2);
		let offeredItems = await crudData.getOfferedItemByUserId(1);
		expect(offeredItems[0].breed).toBe('Angus cattle');
		expect(offeredItems[1].type_of_feed).toBe('Pasture');
	});

	it('test userId is out of range', async () => {
		expect.assertions(1);
		let offeredItems = await crudData.getOfferedItemByUserId(10);
		expect(offeredItems.length).toBe(0);
	});
});

describe('add/delete/update dummy data', () => {
	it('add offered item to user 1', async () => {
		expect.assertions(4);
		let data = {
			user_id: 1,
			breed: 'lemi',
			type_of_feed: 'jeff'
		};
		let offeredItems = await crudData.addOfferedItemByUserId(data);
		expect(offeredItems.breed).toBe('lemi');
		let itemId = offeredItems.id;
		const newData = {
			breed: 'barry'
		};
		let updateItems = await crudData.updateOfferedItemByItemId(itemId, newData);
		expect(updateItems).toEqual([ 1 ]);
		let offeredItems2 = await crudData.getOfferedItemByUserId(1);
		expect(offeredItems2[offeredItems2.length - 1].breed).toBe('barry');
		let deletedItems = await crudData.deleteOfferedItemByItemId(itemId);
		expect(deletedItems).toBe(1);
	});
});
