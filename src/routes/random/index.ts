import express from 'express';
import controller from './controller';

const router = express.Router();

/**
 * @swagger
 * /random/generate:
 *    get:
 *      summmary: Generates an array of size 4
 *      tags: [Random]
 *      responses:
 *         200:
 *          description: Successful Generated Data
 *          content:
 *           application/json:
 */
router.get('/generate', controller.generateData);
/**
 * @swagger
 * /random/report:
 *    get:
 *      summmary: Generates summary report of the data
 *      tags: [Random]
 *      responses:
 *         200:
 *          description: Successful Generated Summary Report
 */
router.get('/report', controller.reportData);
/**
 * @swagger
 * /random/file/{filename}:
 *     get:
 *      summmary: Returns all the data generate and writes it on a 'data.txt' file
 *      tags: [Random]
 *      parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         required: true
 *         description: The data file name
 *      responses:
 *         200:
 *          description: Successful file download
 *         400:
 *          description: Wrong file name
 *         500:
 *          description: Internal Server Issue
 */
router.get('/file/:filename', controller.downloadData);

export default router;
