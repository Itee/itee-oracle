console.log('Itee.Database.Oracle v1.0.2 - CommonJs')
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var OracleDBDriver = require('oracledb');
var iteeDatabase = require('itee-database');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			}
		});
	}
	n['default'] = e;
	return Object.freeze(n);
}

var OracleDBDriver__namespace = /*#__PURE__*/_interopNamespace(OracleDBDriver);

/**
 * @author [Ahmed DCHAR]{@link https://github.com/dragoneel}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

//https://github.com/oracle/node-oracledb#-installation

class TOracleDatabase extends iteeDatabase.TAbstractDatabase {

    constructor ( parameters = {} ) {

        const _parameters = {
            ...{},
            ...parameters,
            ...{
                driver: OracleDBDriver__namespace
            }
        };

        super( _parameters );

    }

    close ( /*onCloseCallback*/ ) {}

    connect () {

        const config = {
            user:          'DbUser',
            password:      'DbPassword',
            connectString: 'localhost:1521/orcl'
        };

        async function getEmployee ( empId ) {
            let conn;

            try {
                conn = await this._driver.getConnection( config );

                const result = await conn.execute(
                    'select * from employees where employee_id = :id',
                    [ empId ]
                );

                this.logger.log( result.rows[ 0 ] );
            } catch ( err ) {
                this.logger.log( 'Ouch!', err );
            } finally {
                if ( conn ) { // conn assignment worked, need to close
                    await conn.close();
                }
            }
        }

        getEmployee( 101 );

    }

    on ( /*eventName, callback*/ ) {}

    _initDatabase () {
        super._initDatabase();

    }

}

exports.TOracleDatabase = TOracleDatabase;
//# sourceMappingURL=itee-oracle.cjs.js.map
