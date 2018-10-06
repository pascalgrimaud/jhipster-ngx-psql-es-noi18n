/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestCustomTableNameDetailComponent } from 'app/entities/test-custom-table-name/test-custom-table-name-detail.component';
import { TestCustomTableName } from 'app/shared/model/test-custom-table-name.model';

describe('Component Tests', () => {
    describe('TestCustomTableName Management Detail Component', () => {
        let comp: TestCustomTableNameDetailComponent;
        let fixture: ComponentFixture<TestCustomTableNameDetailComponent>;
        const route = ({ data: of({ testCustomTableName: new TestCustomTableName(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestCustomTableNameDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestCustomTableNameDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestCustomTableNameDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testCustomTableName).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
