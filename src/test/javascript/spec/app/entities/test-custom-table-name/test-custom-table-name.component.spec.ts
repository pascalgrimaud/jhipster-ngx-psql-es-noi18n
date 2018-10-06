/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestCustomTableNameComponent } from 'app/entities/test-custom-table-name/test-custom-table-name.component';
import { TestCustomTableNameService } from 'app/entities/test-custom-table-name/test-custom-table-name.service';
import { TestCustomTableName } from 'app/shared/model/test-custom-table-name.model';

describe('Component Tests', () => {
    describe('TestCustomTableName Management Component', () => {
        let comp: TestCustomTableNameComponent;
        let fixture: ComponentFixture<TestCustomTableNameComponent>;
        let service: TestCustomTableNameService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestCustomTableNameComponent],
                providers: []
            })
                .overrideTemplate(TestCustomTableNameComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestCustomTableNameComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestCustomTableNameService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestCustomTableName(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testCustomTableNames[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
