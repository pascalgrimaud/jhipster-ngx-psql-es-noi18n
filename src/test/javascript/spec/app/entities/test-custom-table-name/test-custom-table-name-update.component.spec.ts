/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestCustomTableNameUpdateComponent } from 'app/entities/test-custom-table-name/test-custom-table-name-update.component';
import { TestCustomTableNameService } from 'app/entities/test-custom-table-name/test-custom-table-name.service';
import { TestCustomTableName } from 'app/shared/model/test-custom-table-name.model';

describe('Component Tests', () => {
    describe('TestCustomTableName Management Update Component', () => {
        let comp: TestCustomTableNameUpdateComponent;
        let fixture: ComponentFixture<TestCustomTableNameUpdateComponent>;
        let service: TestCustomTableNameService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestCustomTableNameUpdateComponent]
            })
                .overrideTemplate(TestCustomTableNameUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestCustomTableNameUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestCustomTableNameService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestCustomTableName(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testCustomTableName = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestCustomTableName();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testCustomTableName = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
